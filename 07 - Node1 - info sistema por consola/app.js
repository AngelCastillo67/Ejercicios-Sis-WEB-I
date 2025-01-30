const os  = require("os");
const http = require('http');
const fs = require('fs');
const process = require("process");
const port = 3000;

// Leer archivo .json
const configPath = "config.json";
let configuracion = {
    logInterval: 5000,
    logCPU: true,
    logMemory: true,
    logSystemUptime: true,
    logProcessUptime: true,
};

// Función para cargar la configuración desde un archivo JSON
// Esta función intenta leer el archivo config.json y parsear su contenido
// Si la lectura es exitosa, actualiza la variable 'configuracion' con los datos del archivo
// Si ocurre un error durante la lectura, se captura y se muestra en la consola
function loadConfig(){
    try {
        fs.readFile(configPath, "utf-8", (err, data) => {
            if (err) throw err;
            configuracion = JSON.parse(data);
            console.log("Configuración cargada", configuracion);
        });
    } catch (err) {
        console.log("Error de carga de .json", err);
    }
}

// Función para registrar información del sistema y de Node.js al iniciar el servidor
// Esta función imprime en la consola información básica del sistema operativo y la versión de Node.js
// Se ejecuta una vez cuando el servidor se inicia
function logStartupInfo() {
    console.log("Iniciando servidor...");
    console.log("Sistema Operativo:", os.type(), os.release());
    console.log("Versión de Node.js:", process.version);
}

// Función para registrar información periódica del sistema
// Esta función imprime en la consola información detallada del sistema en intervalos regulares
// La información que se registra depende de la configuración cargada desde el archivo JSON
// Puede incluir información sobre la CPU, memoria libre, tiempo de actividad del sistema y tiempo de actividad del proceso
function logSystemInfo() {
    console.log("--- Información del Sistema ---");
  
    if (configuracion.logCPU) {
        console.log("Información de la CPU:", os.cpus());
    }
  
    if (configuracion.logMemory) {
        console.log("Memoria Libre:", os.freemem()); 
    }
  
    if (configuracion.logSystemUptime) {
        console.log("Tiempo de Actividad del Sistema:", os.uptime());
    }
  
    if (configuracion.logProcessUptime) {
        console.log("Tiempo de Actividad del Proceso:", process.uptime());
    }
}

// Crear un servidor HTTP que responde con "Hello, World!" a cada solicitud
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, World!</h1>');
});

// Iniciar el servidor en el puerto especificado
// Al iniciar, se carga la configuración, se registra la información de inicio y se configura un intervalo para registrar información del sistema periódicamente
server.listen(port, () => {
    loadConfig();
    logStartupInfo();
    // Registrar información del sistema basado en el intervalo configurado
    setInterval(logSystemInfo, configuracion.logInterval);

    console.log("El servidor está corriendo en http://localhost:3000");
});



