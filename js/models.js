
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
                    
                    databaseTascas.push(...data);
                    mostrarTascas();
                   

                    guardarDatos("databaseTascas", databaseTascas);
                    

                    const soloCategorias = data.map(tasca => tasca.categoria);
                    databasesCategories.push(...soloCategorias);
            
                    
                    guardarDatos("databasesCategories", databasesCategories);
                })
                .catch(err => console.error("Fallo en fetch:", err));
        });
    }
});
