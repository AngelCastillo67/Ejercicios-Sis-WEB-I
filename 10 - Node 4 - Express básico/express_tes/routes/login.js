var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* POST login page. */
router.post('/', function(req, res, next) {
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') { // Ejemplo de autenticación simple
    req.session.user = { username: username }; // Guardar usuario en la sesión
    res.redirect('/restricted');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
