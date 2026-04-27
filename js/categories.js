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
    mostrarCategorias();

    console.log(databasesCategories);

    localStorage.setItem("databasesCategories", JSON.stringify(databasesCategories));

  

});

 let arrayRecojido = JSON.parse(localStorage.getItem("databasesCategories"));
if(arrayRecojido != null){
    databasesCategories = arrayRecojido;
    mostrarCategorias();
}
 
console.log(databasesCategories);

function mostrarCategorias(){

    const contenedor = document.getElementById("listaCategoriasUl");
    
    
    contenedor.innerHTML = '';

    databasesCategories.forEach((categoria, index) => {
        contenedor.innerHTML += `
        <div class="CategoriaItem">
                <li class="categoriaItem"> 
                    <div class="colorCircle" style=" background-color: ${categoria.colorPicker};"></div> 
                    ${categoria.nombreCategoria} 
                    <div class="buttonDelete">
                            <button  onclick="borrarCategoria(${index})">
                                Eliminar
                            </button>
                    </div>
                </li>
        </div>
        
        `
    });
}

function borrarCategoria(index){

    databasesCategories.splice(index,1);
        localStorage.setItem('databasesCategories',JSON.stringify(databasesCategories));
    mostrarCategorias();

}
