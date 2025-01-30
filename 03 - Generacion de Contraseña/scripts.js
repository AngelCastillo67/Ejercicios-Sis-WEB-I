// Diccionario de palabras disponibles para generar la contraseña
const dictionary = [
    "manzana", "nube", "sol", "estrella", "mar", "montaña", 
    "camino", "cielo", "fuego", "viento", "tierra", "lluvia"
];

// Función para generar una contraseña basada en un número de palabras
function generatePassword(numWords) {
    // Array para almacenar las palabras seleccionadas
    const selectedWords = [];
    // Array para almacenar los índices ya seleccionados
    const indices = [];
    // Bucle para seleccionar palabras aleatorias del diccionario
    for (let i = 0; i < numWords; i++) {
        let randomIndex;
        // Asegura que el índice seleccionado no se repita
        do {
            randomIndex = Math.floor(Math.random() * dictionary.length);
        } while (indices.includes(randomIndex));
        // Añade el índice seleccionado al array de índices
        indices.push(randomIndex);
        // Obtiene la palabra correspondiente al índice aleatorio
        let word = dictionary[randomIndex];
        // Convierte la primera letra de la palabra en mayúscula      
        word = word.charAt(0).toUpperCase() + word.slice(1);
        // Añade la palabra seleccionada al array
        selectedWords.push(word);
    }
    // Une las palabras seleccionadas en una sola cadena y la retorna
    return selectedWords.join("");
}

// Añade un evento al botón para generar la contraseña cuando se hace clic
document.getElementById("btn").addEventListener("click", ()=> {
    // Obtiene el número de palabras del input
    const numWords = document.getElementById("numWords").value;
    // Genera la contraseña con el número de palabras especificado
    const password = generatePassword(numWords);
    // Muestra la contraseña generada en el elemento con id "password"
    document.getElementById("password").textContent = password;
})
