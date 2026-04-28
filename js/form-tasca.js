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
        option.value = cat.nombreCategoria;
        option.textContent = cat.nombreCategoria;
        selectElement.appendChild(option);
    });
}

cargarCategoria();

console.log(databasesCategories);

document.getElementById("formTasca").addEventListener('submit', function(event){
    event.preventDefault();
    
    const titol = document.getElementById("titol").value;
    const descripcio = document.getElementById("descripcio").value;
    const data = document.getElementById("data").value;
    const categoria = document.getElementById("categoria").value;

    let fechaSeleccionada = new Date(data).setHours(0,0,0,0);
    let fechaHoy = new Date().setHours(0,0,0,0);

    if (titol.trim() === "" || descripcio.trim() === "" || data === "" || categoria === "") {
        alert("Por favor, rellena todos los campos");
        return; 
    }

    if (fechaSeleccionada < fechaHoy) {
        alert("La fecha no puede ser anterior a la fecha actual");
        return;
    };

    let Tasca = {
        titol : titol,
        descripcio: descripcio,
        data: data,
        categoria: categoria,
        completado: false
    }

    databaseTascas.push(Tasca);

    console.log(databaseTascas);

    localStorage.setItem("databaseTascas", JSON.stringify(databaseTascas));
});