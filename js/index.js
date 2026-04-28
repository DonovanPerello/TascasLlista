import { databaseTascas } from "./form-tasca";

export function mostrarCategorias(){

    const contenedor = document.getElementById("tasques-pendents");
    
    if(!contenedor) return;
    
    contenedor.innerHTML = '';

    databaseTascas.forEach((Tasca, index) => {
        contenedor.innerHTML += 
        `
        
        
        `
    });
}