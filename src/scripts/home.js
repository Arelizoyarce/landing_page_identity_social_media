
//js del titulo de somos creadores 
// Escribe el texto letra por letra, simulando una máquina de escribir.
const texto = "SOMOS CREADORES";

// Función que escribe el texto
let timeoutRef;

function escribirTexto() {
  const titulo = document.getElementById("titulo-creador");
  if (!titulo) return;

  let i = 0;
  titulo.textContent = "";

  function escribir() {
    if (i < texto.length) {
      titulo.textContent += texto.charAt(i);
      i++;
      timeoutRef = setTimeout(escribir, 150);
    } else {
      timeoutRef = setTimeout(() => {
        titulo.textContent = "";
        i = 0;
        escribir();
      }, 2000);
    }
  }

  if (timeoutRef) clearTimeout(timeoutRef); // Detiene cualquier animación previa
  escribir();
}

// Función que busca #titulo-creador cada cierto tiempo y lanza el efecto si aparece
function iniciarEfectoCuandoAparezca() {
  const intervalo = setInterval(() => {
    const titulo = document.getElementById("titulo-creador");
    if (titulo && !titulo.dataset.animado) {
      titulo.dataset.animado = "true";
      escribirTexto();
      clearInterval(intervalo); // Detiene la búsqueda una vez encontrado
    }
  }, 200);
}

// Ejecuta cada vez que se cambia el contenido de #app
const observer = new MutationObserver(() => {
  iniciarEfectoCuandoAparezca();
});

const app = document.getElementById("app");
if (app) {
  observer.observe(app, { childList: true, subtree: true });
}

// También ejecuta al inicio
iniciarEfectoCuandoAparezca();




//-------Muestra u oculta la descripción del servicio según el 
// índice de la categoría sobre la que se pase el mouse
function mostrarTexto(index) {
  document.getElementsByClassName("descripcion")[index].style.display = "block";
}

function ocultarTexto(index) {
  document.getElementsByClassName("descripcion")[index].style.display = "none";
}

escribirTexto()

