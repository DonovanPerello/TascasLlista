export function guardarDatos(nombreLlave, datos) {
  
    localStorage.setItem(nombreLlave, JSON.stringify(datos));
}

export function extraerDatos(nombreLlave) {
    const datos = localStorage.getItem(nombreLlave);
    return datos ? JSON.parse(datos) : null;
}