document.getElementById('cargarUsuarios').addEventListener('click', function() {
    // Realiza la solicitud usando fetch
    fetch('https://jsonplaceholder.typicode.com/users') // URL de la API
      .then(response => response.json()) // Convierte la respuesta en JSON
      .then(usuarios => {
        const lista = document.getElementById('listaUsuarios'); // Selecciona el elemento UL
        lista.innerHTML = ''; // Limpia la lista antes de llenarla
        usuarios.forEach(usuario => {
          // Crea un nuevo elemento li por cada usuario
          const li = document.createElement('li');
          li.textContent = `${usuario.name} (${usuario.email})`; // Asigna nombre y correo
          lista.appendChild(li); // Agrega el item a la lista
        });
      })
      // Manejo de errores
      .catch(error => console.error('Error:', error));
});
