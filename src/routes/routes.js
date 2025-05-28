// Enrutador SPA simple que carga HTML, CSS y JS dinámicamente según el hash de la URL

const routes = {
  '/': 'src/pages/home.html',
  '/aboutus': 'src/pages/aboutus.html',
  '/services': 'src/pages/services.html',
  '/portfolio': 'src/pages/portfolio.html',
  '/contact': 'src/pages/contact.html',
};

const styles = {
  '/': 'src/styles/home.css',
  '/aboutus': 'src/styles/aboutus.css',
  '/services': 'src/styles/services.css',
  '/portfolio': 'src/styles/portfolio.css',
  '/contact': 'src/styles/contact.css',
};

const scripts = {
  '/': null,
  '/aboutus': null,
  '/services': null,
  '/portfolio': null,
  '/contact': 'src/scripts/contact.js',
};

const app = document.getElementById('app');

// Elimina los estilos y scripts previamente cargados
function cleanPreviousResources() {
  document.querySelectorAll('[data-route-style], [data-route-script]').forEach(el => el.remove());
}

// Carga el archivo de estilos correspondiente a la ruta
function loadStyle(stylePath, routeKey) {
  if (!stylePath) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = stylePath;
  link.setAttribute('data-route-style', routeKey);
  document.head.appendChild(link);
}

// Carga el archivo de script correspondiente a la ruta
function loadScript(scriptPath, routeKey) {
  if (!scriptPath) return;

  const script = document.createElement('script');
  script.src = scriptPath;
  script.setAttribute('data-route-script', routeKey);
  script.defer = true;
  document.body.appendChild(script);
}

// Carga el HTML, CSS y JS de la ruta actual
async function loadRoute() {
  const path = location.hash.slice(1) || '/';
  const htmlPath = routes[path];
  const stylePath = styles[path];
  const scriptPath = scripts[path];

  if (!htmlPath) {
    app.innerHTML = '<h2>Página no encontrada.</h2>';
    return;
  }

  try {
    const response = await fetch(htmlPath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const html = await response.text();

    cleanPreviousResources();
    app.innerHTML = html;
    loadStyle(stylePath, path);
    loadScript(scriptPath, path);
  } catch (error) {
    console.error('Error cargando la ruta:', error);
    app.innerHTML = '<h2>Error al cargar la página.</h2>';
  }
}

// Escucha cambios de hash y carga la ruta correspondiente
window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);
