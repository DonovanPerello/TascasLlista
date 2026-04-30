export let databaseTascas = JSON.parse(localStorage.getItem("databaseTascas")) || [];

export let databasesCategories = JSON.parse(localStorage.getItem("databasesCategories")) || [];


export function guardarDatos(nombreLlave, datos) {
  
    localStorage.setItem(nombreLlave, JSON.stringify(datos));
}




