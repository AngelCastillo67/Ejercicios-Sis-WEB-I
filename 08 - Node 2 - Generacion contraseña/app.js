// Importa el módulo http para crear el servidor
const http = require('http');
// Importa el módulo fs para trabajar con el sistema de archivos
const fs = require('fs');
// Importa el módulo path para trabajar con rutas de archivos
const path = require('path');
// Define el puerto en el que el servidor escuchará
const port = 3000;

// Crea el servidor HTTP
const server = http.createServer((req, res) => {
    // Verifica si la solicitud es para el archivo diccionario.json
    if (req.url === '/diccionario.json') {
        // Define la ruta del archivo diccionario.json
        const filePath = path.join(__dirname, 'diccionario.json');
        // Lee el archivo diccionario.json
        fs.readFile(filePath, (err, contenido) => {
            if (err) {
                // Si hay un error, responde con un código 500 y un mensaje de error
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Error del servidor' }));
                return;
            }
            // Si no hay error, responde con el contenido del archivo y un código 200
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(contenido);
        });
    // Verifica si la solicitud es para el archivo script.js
    } else if (req.url === '/script.js') {
        // Define la ruta del archivo script.js
        const filePath = path.join(__dirname, 'script.js');
        // Lee el archivo script.js
        fs.readFile(filePath, (err, contenido) => {
            if (err) {
                // Si hay un error, responde con un código 500 y un mensaje de error
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error del servidor');
                return;
            }
            // Si no hay error, responde con el contenido del archivo y un código 200
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript');
            res.end(contenido);
        });
    // Para cualquier otra solicitud, sirve el archivo index.html
    } else {
        // Define la ruta del archivo index.html
        const filePath1 = path.join(__dirname, 'index.html');
        // Lee el archivo index.html
        fs.readFile(filePath1, (err, contenido) => {
            if (err) {
                // Si hay un error, responde con un código 500 y un mensaje de error
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/html');
                res.end('error servidor');
                return;
            }
            // Si no hay error, responde con el contenido del archivo y un código 200
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(contenido);
        });
    }
});

// El servidor escucha en el puerto definido
server.listen(port, () => {
    // Muestra un mensaje en la consola indicando que el servidor está corriendo
    console.log("El servidor está corriendo en http://localhost:3000");
});