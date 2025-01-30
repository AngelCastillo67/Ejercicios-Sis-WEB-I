// Importa el módulo axios para hacer peticiones HTTP
const axios = require('axios');
// Importa el módulo cheerio para manipular el DOM
const cheerio = require('cheerio');
// Importa el módulo http para crear un servidor HTTP
const http = require('http');

// Define la URL de la web a descargar
const url = 'https://example.com'; // URL de la web a descargar

// Función asíncrona para descargar el HTML de la web
const fetchData = async () => {
  try {
    // Hace una petición GET a la URL y retorna el HTML de la respuesta
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Muestra un error en caso de que la petición falle
    console.error('Error fetching data:', error);
    return null;
  }
};

// Función para procesar el HTML descargado
const processHTML = (html) => {
  // Carga el HTML en cheerio para manipular el DOM
  const $ = cheerio.load(html);
  // Extrae el título de la página
  const title = $('title').text();
  // Muestra el título en la consola
  console.log('Title:', title);
  // Verifica el contenido del HTML descargado
  console.log('HTML content:', html);
};

// Crea un servidor HTTP
const server = http.createServer(async (req, res) => {
  // Verifica si la URL solicitada es la raíz
  if (req.url === '/') {
    // Descarga el HTML de la web
    const html = await fetchData();
    if (html) {
      // Procesa el HTML si la descarga fue exitosa
      processHTML(html);
      // Responde con un mensaje de éxito
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('HTML processed successfully');
    } else {
      // Responde con un mensaje de error si la descarga falló
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Failed to fetch HTML');
    }
  } else {
    // Responde con un mensaje de "Not Found" si la URL no es la raíz
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Define el puerto en el que el servidor escuchará las peticiones
const PORT = process.env.PORT || 3000;
// Inicia el servidor y muestra un mensaje en la consola
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Configura un intervalo para descargar y procesar el HTML cada 10 minutos
setInterval(async () => {
  // Descarga el HTML de la web
  const html = await fetchData();
  if (html) {
    // Procesa el HTML si la descarga fue exitosa
    processHTML(html);
  }
}, 10 * 60 * 1000);
