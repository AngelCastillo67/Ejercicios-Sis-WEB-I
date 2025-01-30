var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth'); // Importa el middleware de autenticación

// Renderiza la página de registro
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register', message: null });
});

// Maneja la lógica de registro
router.post('/', auth.register);

module.exports = router; // Exporta el router para usarlo en app.js
