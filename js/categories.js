import { mostrarTascas } from "./index.js";
import { guardarDatos, databaseTascas, databasesCategories } from "./storage.js";

const formCat = document.getElementById("FormCategoria");

if (formCat) {
    formCat.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById("categoryName").value;
        const color = document.getElementById("color").value;

        if (name.trim() === "") return;

        let Categoria = {
            nom: name,
            color: color
        };

        databasesCategories.push(Categoria);
        mostrarCategorias();
        guardarDatos("databasesCategories", databasesCategories);
    });
}

if (databasesCategories != null && document.getElementById("listaCategoriasUl")) {
    mostrarCategorias();
}

export function mostrarCategorias() {
    const contenedor = document.getElementById("listaCategoriasUl");
    if (!contenedor) return;

    contenedor.innerHTML = '';

    databasesCategories.forEach((categoria, index) => {
        contenedor.innerHTML += `
        <div class="CategoriaItem">
            <li class="categoriaItem"> 
                <div class="colorCircle" style="background-color: ${categoria.color};"></div> 
                <span class="nombre-cat">${categoria.nom}</span>
                <div class="buttonDelete">
                    <button onclick="borrarCategoria(${index})">Eliminar</button>
                </div>
            </li>
        </div>`;
    });
}

export function borrarCategoria(index) {
    const catABorrar = databasesCategories[index];

    databaseTascas.forEach((tasca, tascaIndex) => {
        if (tasca.categoria && 
            tasca.categoria.nom === catABorrar.nom && 
            tasca.categoria.color === catABorrar.color) {
            databaseTascas[tascaIndex].categoria = { nom: "Sin categoria", color: "#ffffff" };
        }
    });

    databasesCategories.splice(index, 1);
    guardarDatos("databasesCategories", databasesCategories);
    guardarDatos("databaseTascas", databaseTascas);
    mostrarCategorias();
}

window.borrarCategoria = borrarCategoria;