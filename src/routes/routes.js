const routes = {
    '/': 'src/pages/home.html',
    '/aboutus': 'src/pages/aboutus.html',
    '/services': 'src/pages/services.html',
    '/portfolio': 'src/pages/portfolio.html',
    '/contact': 'src/pages/contact.html',
  };
  
  const app = document.getElementById('app');
  
  const loadRoute = async () => {
    const path = location.hash.slice(1) || '/';
    console.log('path', path)
    const route = routes[path];
  console.log('route', route)
    if (route) {
      try {
        const response = await fetch(route);
        const html = await response.text();
        app.innerHTML = html;
      } catch (err) {
        app.innerHTML = '<h2>Error al cargar la página.</h2>';
      }
    } else {
      app.innerHTML = '<h2>Página no encontrada.</h2>';
    }
  };
  

  window.addEventListener('hashchange', loadRoute);
  window.addEventListener('DOMContentLoaded', loadRoute);
  