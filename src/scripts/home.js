
//js del titulo de somos creadores 
// Escribe el texto letra por letra, simulando una máquina de escribir.

const texto = "SOMOS CREADORES";
let i = 0;

function escribirTexto() {
  const titulo = document.getElementById("titulo-creador");
  if (i < texto.length) {
    titulo.textContent += texto.charAt(i);
    i++;
    setTimeout(escribirTexto, 150); // velocidad de tipeo
  }
}


//-------Muestra u oculta la descripción del servicio según el 
// índice de la categoría sobre la que se pase el mouse
function mostrarTexto(index) {
  document.getElementsByClassName("descripcion")[index].style.display = "block";
}

function ocultarTexto(index) {
  document.getElementsByClassName("descripcion")[index].style.display = "none";
}

escribirTexto()

