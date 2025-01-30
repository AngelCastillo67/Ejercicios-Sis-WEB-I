var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth'); // Importa el middleware de autenticación

// Renderiza la página de login
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', message: null });
});

// Maneja la lógica de login
router.post('/', auth.login);

module.exports = router; // Exporta el router para usarlo en app.js
