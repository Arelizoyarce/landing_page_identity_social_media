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

  
  const app = document.getElementById('app');

const loadRoute = async () => {
  const path = location.hash.slice(1) || '/';
  const route = routes[path];
  const stylePath = styles[path];

  if (route) {
    try {
      const response = await fetch(route);
      const html = await response.text();
      app.innerHTML = html;

      // Elimina estilos anteriores
      document.querySelectorAll('[data-route-style]').forEach(link => link.remove());

      // Inserta el nuevo CSS solo si existe
      if (stylePath) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = stylePath;
        link.setAttribute('data-route-style', path);
        document.head.appendChild(link);
      }

    } catch (err) {
      app.innerHTML = '<h2>Error al cargar la página.</h2>';
    }
  } else {
    app.innerHTML = '<h2>Página no encontrada.</h2>';
  }
};

window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);
