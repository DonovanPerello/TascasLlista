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
    colorPicker: this.colorPicker
    }

    databasesCategories.push(Categoria);

    console.log(databasesCategories);

    


});
