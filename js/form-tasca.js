import { guardarDatos,databaseTascas,databasesCategories} from "./storage.js";


export function cargarCategoria() {
    const selectElement = document.getElementById("categoria");
    if (!selectElement) return;
    
    selectElement.innerHTML = '<option value="">Selecciona una categoria</option>';

    databasesCategories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.nom;
        option.textContent = cat.nom;
        selectElement.appendChild(option);
    });
}

cargarCategoria();


const formTascaElement = document.getElementById("formTasca");
if (formTascaElement) {
    formTascaElement.addEventListener('submit', function(event){
    event.preventDefault();
    
    const titol = document.getElementById("titol").value;
    const descripcio = document.getElementById("descripcio").value;
    const data = document.getElementById("data").value;
    const categoria = document.getElementById("categoria").value;
    const prioritat = document.getElementById("prioritat").value;

    if (titol.trim() === "" || descripcio.trim() === "" || data === "" || categoria === "") {
        alert("Por favor, rellena todos los campos");
        return; 
    }

    const fechaInput = document.getElementById("data").value;


    const dataValue = document.getElementById("data").value;

    const partes = dataValue.split("-");
    const fechaSeleccionada = new Date(partes[0], partes[1] - 1, partes[2]).setHours(0,0,0,0);

    const fechaHoy = new Date().setHours(0,0,0,0);

    if (fechaSeleccionada < fechaHoy) {
        alert("La fecha no puede ser anterior a la fecha actual");
        return;
    }
    const categoriaSeleccionada = document.getElementById("categoria").value;
    const Objectcategoria = databasesCategories.find(cat => cat.nom === categoriaSeleccionada);
    
    let Tasca = {
        id: null,
        titol : titol,
        descripcio: descripcio,
        data: data,
        categoria: Objectcategoria,
        prioritat : prioritat,
        realitzada: false
    }

    generarIdTasca(Tasca);

    if(Tasca.id === null){
        alert("Ha habido un error");
        return;
    } 

    databaseTascas.push(Tasca);

    databaseTascas.sort((a, b) => Number(a.id.slice(5)) - Number(b.id.slice(5)));
    localStorage.setItem("databaseTascas", JSON.stringify(databaseTascas));
    alert("Taca creada correctamente");
})};


export function generarIdTasca(Tasca){

    if(databaseTascas.length === 0){
        Tasca.id = "task-001";

    } else {
        const ultimaTasca = databaseTascas.at(-1);

        let numeroExtraido = ultimaTasca.id.slice(5);

        let numeroInt = Number(numeroExtraido);
        let numeroFinal = numeroInt + 1;

        let idFormateado = numeroFinal.toString().padStart(3, '0');

        Tasca.id = "task-" + idFormateado;


    }

};