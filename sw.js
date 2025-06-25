const CACHE_NAME = 'mapa-ucv-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// Instalar el service worker y cachear recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Error al cachear recursos:', error);
        // Continuar sin cachear si hay errores
        return Promise.resolve();
      })
  );
});

// Interceptar requests y servir desde cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devolver desde cache si existe
        if (response) {
          return response;
        }
        
        // Si no está en cache, hacer fetch normal
        return fetch(event.request)
          .then(response => {
            // Verificar si es una respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonar la respuesta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Si falla el fetch y no está en cache, mostrar página offline básica
            if (event.request.destination === 'document') {
              return new Response(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Sin conexión - Mapa UCV</title>
                  <style>
                    body { 
                      font-family: Arial, sans-serif; 
                      text-align: center; 
                      padding: 2rem; 
                      background: #2c3e50; 
                      color: white; 
                    }
                    .offline-message {
                      background: #e74c3c;
                      padding: 2rem;
                      border-radius: 8px;
                      margin: 2rem auto;
                      max-width: 400px;
                    }
                  </style>
                </head>
                <body>
                  <div class="offline-message">
                    <h1>Sin conexión a internet</h1>
                    <p>No se puede cargar el mapa en este momento.</p>
                    <p>Por favor, verifica tu conexión e intenta nuevamente.</p>
                    <button onclick="window.location.reload()">Reintentar</button>
                  </div>
                </body>
                </html>
              `, {
                headers: { 'Content-Type': 'text/html' }
              });
            }
          });
      })
  );
});

// Limpiar caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
