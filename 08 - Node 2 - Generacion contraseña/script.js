// Función asincrónica para obtener la contraseña
async function fetchPassword() {
    try {
        // Realiza una solicitud para obtener el archivo diccionario.json
        const response = await fetch('/diccionario.json');
        // Convierte la respuesta a formato JSON
        const data = await response.json();
        // Obtiene los valores del objeto JSON
        const valuesArray = Object.values(data);
        // Genera una contraseña usando los valores obtenidos
        const password = generarContrasena(valuesArray);
        // Muestra la contraseña generada en el elemento con id "contrasena"
        document.getElementById("contrasena").textContent = password;
    } catch (error) {
        // Muestra un error en la consola si ocurre algún problema
        console.error('Error fetching password:', error);
    }
}

// Función para generar una contraseña a partir de un array de valores
function generarContrasena(valuesArray) {
    // Array para almacenar las palabras seleccionadas
    const palabrasSelecionadas = [];
    // Genera un número aleatorio basado en la longitud del array de valores
    const randomNum1 = Math.floor(Math.random() * valuesArray.length);
    
    // Bucle para seleccionar palabras aleatorias
    for (let i = 0; i < randomNum1; i++) {
        // Genera un índice aleatorio
        const indice = Math.floor(Math.random() * valuesArray.length);
        // Obtiene la palabra en el índice aleatorio
        let palabra = valuesArray[indice];
        // Añade la palabra al array de palabras seleccionadas
        palabrasSelecionadas.push(palabra);
    }
    // Une las palabras seleccionadas en una sola cadena y la retorna
    return palabrasSelecionadas.join("");
}

// Añade un evento que se ejecuta cuando el contenido del DOM ha sido cargado
document.addEventListener('DOMContentLoaded', fetchPassword);