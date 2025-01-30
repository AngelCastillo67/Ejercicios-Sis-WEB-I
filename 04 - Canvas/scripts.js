// Obtener el elemento canvas y su contexto de dibujo 2D
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Definir las dimensiones de las nubes
const cloudWidth = 50, cloudHeight = 30;

// Crear un array de nubes con sus posiciones iniciales y velocidades
let clouds = [
    { x: canvas.width, y: 50, speed: 2 },
    { x: canvas.width + 100, y: 100, speed: 3 },
    { x: canvas.width + 150, y: 150, speed: 1.5 }
];

// Definir las dimensiones del muro
const muroWidth = 20, muroHeight = 50;

// Crear un array de muros con sus posiciones iniciales y velocidades
let muros = [
    { x:canvas.width + 400, y:284, speed:10}
];

// Definir las dimensiones del objeto (persona)
const objectWidth = 20, objectHeight = 50;

// Crea "corredor" con su posición inicial y velocidad
let object = {
    x: canvas.width / 3,
    y: 284,
    speed: 1
};

// Agregar un evento que se ejecuta cuando la página se carga completamente
window.addEventListener("load", (event) => {
    init(); // Inicializar la animación
});

// Agregar un evento que se ejecuta cuando se presiona el botón del ratón sobre el canvas
canvas.addEventListener("mousedown", (event) => {
    // Verificar si el botón izquierdo del ratón fue clickeado
    if (event.button === 0) {
        // Levantar la persona su altura más una tercera parte
        object.y -= objectHeight + objectHeight / 3;
    }
});

// Agregar un evento que se ejecuta cuando se suelta el botón del ratón sobre el canvas
canvas.addEventListener("mouseup", (event) => {
    // Verificar si el botón izquierdo del ratón fue clickeado
    if (event.button === 0) {
        // Bajar la persona su altura más una tercera parte
        object.y += objectHeight + objectHeight / 3;
    }
});

// Función de inicialización
function init(){
    window.requestAnimationFrame(draw); // Iniciar la animación
}

// Función de dibujo que se llama en cada frame de la animación
function draw(timestamp){
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Dibuja la parte verde (33% inferior)
    ctx.fillStyle = '#6afc0f';
    ctx.fillRect(0, canvas.height * 2 / 3, canvas.width, canvas.height / 3);

    // Dibuja la parte azul (66% superior)
    ctx.fillStyle = '#0000FF';
    ctx.fillRect(0, 0, canvas.width, canvas.height * 2 / 3);
    
    // Dibuja las nubes
    ctx.fillStyle = "white";
    clouds.forEach(cloud => {
        ctx.fillRect(cloud.x, cloud.y, cloudWidth, cloudHeight);
        cloud.x -= cloud.speed; // Mover la nube hacia la izquierda
        if (cloud.x < -cloudWidth) {
            cloud.x = canvas.width; // Reiniciar la posición de la nube
        }
    });

    // Dibuja el muro
    ctx.fillStyle = "red";
    muros.forEach(muro => {
        ctx.fillRect(muro.x, muro.y, muroWidth, muroHeight);
        muro.x -= muro.speed; // Mover el muro hacia la izquierda
        if (muro.x < -muroWidth) {
            muro.x = canvas.width; // Reiniciar la posición del muro
        }
    });

    // Dibuja la persona
    ctx.fillStyle = "black";
    ctx.fillRect(object.x, object.y, objectWidth, objectHeight);

    // Verificar colisiones entre la persona y los muros
    let collision = muros.some(muro => {
        return object.x < muro.x + muroWidth &&
               object.x + objectWidth > muro.x &&
               object.y < muro.y + muroHeight &&
               object.y + objectHeight > muro.y;
    });

    // Si no hay colisión, continuar la animación
    if (!collision) {
        window.requestAnimationFrame(draw);
    } else {
        console.log("Colisión detectada. Animación detenida."); // Detener la animación en caso de colisión
    }
}