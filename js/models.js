
import { mostrarTascas } from "./index.js";
import { guardarDatos,databaseTascas,databasesCategories} from "./storage.js"

const archivosDisponibles = [
    "activitats_001.json",
    "activitats_002.json",
    "activitatXML_001.xml"
];

export function mostrarArchivos() {
    const datalist = document.getElementById("archivos-disponibles");
    if (!datalist) return;

    datalist.innerHTML = '';
    archivosDisponibles.forEach(archivo => {
        const option = document.createElement("option");
        option.value = archivo;
        datalist.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarArchivos();

    const btnPujar = document.getElementById("btn-pujar");

    if (btnPujar) {
        btnPujar.addEventListener("click", function() {
            const inputArchivo = document.getElementById("nombre-archivo");
            const archivoSeleccionado = inputArchivo.value;

            if (archivoSeleccionado.trim() === "") {
                alert("Por favor, selecciona un archivo");
                return;
            } else if (!archivosDisponibles.includes(archivoSeleccionado)) {
                alert("Archivo no encontrado.");
                return;
            }

                fetch(`./dades/${archivoSeleccionado}`)
                    .then(response => {

                        
                            if (!response.ok) throw new Error("Error al cargar");
                                if(archivoSeleccionado.endsWith("json")){
                                return response.json();
                                } else return response.text();
                        
                    })
                    .then(data => {
                        let tareasBase = [];

                        
                        if(archivoSeleccionado.endsWith("json")){
                            tareasBase = data; 
                        } else {
                            tareasBase = transformarXMLaTascas(data);
                        }
                        tareasBase = comprobrarJSON(tareasBase);
                        const categoriasParaAñadir = comprobarCategorias(tareasBase);

                        databaseTascas.sort((a, b) => Number(a.id.slice(5)) - Number(b.id.slice(5)));
                        
                        const tareasConId = cambiarIDs(tareasBase);

                        databaseTascas.push(...tareasConId);
                        databasesCategories.push(...categoriasParaAñadir);

                        mostrarTascas();
                        guardarDatos("databaseTascas", databaseTascas);
                        guardarDatos("databasesCategories", databasesCategories);
                    })
                    .catch(err => console.error("Fallo en fetch:", err));
            });
    }
});

export function comprobrarJSON(data) {
    for (let i = data.length - 1; i >= 0; i--) {
        const itemActual = data[i];
        const existeEnBD = databaseTascas.some(dbItem => dbItem.titol === itemActual.titol);
        if (existeEnBD) {
            data.splice(i, 1);
        }
    }
    return data;
}
export function transformarXMLaTascas(textoXML) {
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(textoXML, "application/xml");
    
    let tascasGeneradas = [];
    
    const nodosTasca = xmlDoc.getElementsByTagName("tasca");

    for (let i = 0; i < nodosTasca.length; i++) {
        const nodo = nodosTasca[i];
        
        let tascaTraduida = {
            id: nodo.getAttribute("id"), 
            titol: nodo.getElementsByTagName("titol")[0].textContent,
            
            descripcio: nodo.getElementsByTagName("descripcio")[0].textContent,
            data:nodo.getElementsByTagName("data")[0].textContent,
            categoria: {
                        nom: nodo.getElementsByTagName("nom")[0].textContent,
                        color: nodo.getElementsByTagName("color")[0].textContent
                        },
            prioritat: nodo.getElementsByTagName("prioritat")[0].textContent,
            realitzada: false
        
        };
        
        tascasGeneradas.push(tascaTraduida);
    }
    
    return tascasGeneradas;
}

export function cambiarIDs(data) {
    let lastIdNum = 0;
    if (databaseTascas.length > 0) {
        let lastTasca = databaseTascas.at(-1);
        lastIdNum = Number(lastTasca.id.slice(5));
    }

    data.forEach((task, index) => {
        let nuevoNumero = lastIdNum + index + 1;
        let idFormateado = nuevoNumero.toString().padStart(3, '0');
        task.id = "task-" + idFormateado;
    });

    return data;
}

export function comprobarCategorias(data) {
    let nuevasCategorias = [];
    data.forEach(item => {
        const catActual = item.categoria;
        const existeEnBD = databasesCategories.some(dbItem => dbItem.nom === catActual.nom);
        const yaAñadida = nuevasCategorias.some(n => n.nom === catActual.nom);

        if (!existeEnBD && !yaAñadida) {
            nuevasCategorias.push(catActual);
        }
    });
    return nuevasCategorias;
}
