import { guardarDatos} from "./storage.js";


export let databasesCategories = JSON.parse(localStorage.getItem("databasesCategories")) || [];


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

let arrayRecojido = JSON.parse(localStorage.getItem("databasesCategories"));

if (arrayRecojido != null) {
    databasesCategories = arrayRecojido;
    if (document.getElementById("listaCategoriasUl")) {
        mostrarCategorias();
    }
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



    databasesCategories.splice(index, 1);
    guardarDatos("databasesCategories", databasesCategories);
    mostrarCategorias();
}
console.log(databasesCategories)
window.borrarCategoria = borrarCategoria;

