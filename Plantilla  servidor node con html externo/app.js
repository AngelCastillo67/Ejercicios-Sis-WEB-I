const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

// Crear un servidor HTTP que responde con "Hello, World!" a cada solicitud
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath,(err, contenido) => {
        if (err) {
            res.statusCode= 500;
            res.setHeader('Content-Type', 'text/html');
            res.end('error servidor');
            return;
        }

        res.statusCode= 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(contenido);
    });


});

// Iniciar el servidor en el puerto especificado
// Al iniciar, se carga la configuración, se registra la información de inicio y se configura un intervalo para registrar información del sistema periódicamente
server.listen(port, () => {
    console.log("El servidor está corriendo en http://localhost:3000");


});