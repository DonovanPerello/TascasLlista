export function guardarDatos(nombreLlave, datos) {
  
    localStorage.setItem(nombreLlave, JSON.stringify(datos));
}

