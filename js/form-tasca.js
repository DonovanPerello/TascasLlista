let databasesCategories = [];

const datosLocal = localStorage.getItem("databasesCategories");
if (datosLocal) {
    databasesCategories = JSON.parse(datosLocal);
}

function cargarCategoria() {
    const selectElement = document.getElementById("categoria");
    
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