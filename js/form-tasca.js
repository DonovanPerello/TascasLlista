export let databasesCategories = [];

export let databaseTascas = JSON.parse(localStorage.getItem("databaseTascas")) || [];

const datosLocal = localStorage.getItem("databasesCategories");
if (datosLocal) {
    databasesCategories = JSON.parse(datosLocal);
}

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

console.log(databasesCategories);

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
        titol : titol,
        descripcio: descripcio,
        data: data,
        categoria: Objectcategoria,
        prioritat : prioritat,
        realitzada: false
    }

    databaseTascas.push(Tasca);

    console.log(databaseTascas);

    localStorage.setItem("databaseTascas", JSON.stringify(databaseTascas));
})};