var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth'); // Importa el middleware de autenticación

// Renderiza la página de usuario si está autenticado
router.get('/', auth.authenticate, function(req, res, next) {
  res.render('user', { title: 'User Page', user: req.session.user });
});

// Maneja la lógica de logout
router.post('/logout', function(req, res, next) {
  console.log(`User logged out: ${req.session.user.username}`);
  req.session.destroy();
  res.redirect('/');
});

module.exports = router; // Exporta el router para usarlo en app.js
