databasesCategories = [];




document.getElementById("FormCategoria").addEventListener('submit', function(event){
event.preventDefault();
 const name =   document.getElementById("categoryName").value;
 const colorPicker =  document.getElementById("colorPicker").value;

    if(name === null){
        event.preventDefault();
    }

    let Categoria = {
    nombreCategoria : name,
    colorPicker: colorPicker
    }

    databasesCategories.push(Categoria);

    console.log(databasesCategories);

    localStorage.setItem("databasesCategories", JSON.stringify(databasesCategories));

   name = document.getElementById("categoryName").value = '';

});
/**
 * let arrayRecojido = JSON.parse(localStorage.getItem("databasesCategories"));
if(arrayRecojido != null){
    databasesCategories = arrayRecojido;
}
 */
console.log(databasesCategories);
