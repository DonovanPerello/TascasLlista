import { databaseTascas,  } from "./form-tasca.js";

console.log(databaseTascas);

export function mostrarTascas(){

    const contenedor = document.getElementById("tasques-pendents");
    const contenedorCompletadas = document.getElementById("tasques-acabades");
    
    if(!contenedor) return;

    contenedorCompletadas.innerHTML = '';
    contenedor.innerHTML = '';

    if (!contenedor || !contenedorCompletadas) return;
    databaseTascas.forEach((Tasca, index) => {

        let TascaFormulari =  `
        <div class="tascasIndex" style="background-color: ${Tasca.categoria.colorPicker};">
                <h3>${Tasca.titol}</h3>
                <p>${Tasca.descripcio}</p>
                <p>${Tasca.data}</p>
                <p>${Tasca.categoria}</p>
                <svg onclick="CompletarTasca(${index})" id="check-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-icon lucide-square-check"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
                <svg onclick="borrarTasca(${index})" id="trash-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </div>
        
        `
        if(Tasca.completado === false){
        contenedor.innerHTML += TascaFormulari;
        } else {
        contenedorCompletadas.innerHTML += TascaFormulari;
        }
});

}

export function CompletarTasca(index){

    databaseTascas[index].completado = true;
    localStorage.setItem("databaseTascas", JSON.stringify(databaseTascas));
    mostrarTascas();
}

export function borrarTasca(index){

    databaseTascas.splice(index,1);
    localStorage.setItem("databaseTascas", JSON.stringify(databaseTascas));
    mostrarTascas();
}
window.CompletarTasca = CompletarTasca;
window.borrarTasca = borrarTasca;
mostrarTascas();