
import { mostrarTascas } from "./index.js";
import { guardarDatos,databaseTascas,databasesCategories} from "./storage.js"

const archivosDisponibles = [
    "activitats_001.json",
    "activitats_002.json"
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
                        return response.json();
                    })
                    .then(data => {
                        const tareasFiltradas = comprobrarJSON(data);
                        const categoriasParaAñadir = comprobarCategorias(tareasFiltradas);

                        databaseTascas.sort((a, b) => Number(a.id.slice(5)) - Number(b.id.slice(5)));
                        
                        const tareasConId = cambiarIDs(tareasFiltradas);

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
