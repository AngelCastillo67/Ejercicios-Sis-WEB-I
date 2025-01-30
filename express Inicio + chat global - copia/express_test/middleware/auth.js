var fs = require('fs');
var path = require('path');
var usersFilePath = path.join(__dirname, '../users.json'); // Ruta al archivo de usuarios

// Middleware para verificar si el usuario está autenticado
function authenticate(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Middleware para manejar el login
function login(req, res, next) {
  var { username, password } = req.body;
  fs.readFile(usersFilePath, (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data).users;
    var user = users.find(u => u.username === username && u.password === password);
    if (user) {
      req.session.user = user;
      res.redirect('/user');
    } else {
      res.render('login', { title: 'Login', message: 'Invalid username or password' });
    }
  });
}

// Middleware para manejar el registro
function register(req, res, next) {
  var { username, password } = req.body;
  fs.readFile(usersFilePath, (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data).users;
    var userExists = users.find(u => u.username === username);
    if (userExists) {
      res.render('register', { title: 'Register', message: 'Username already exists' });
    } else {
      // Reglas para crear un usuario y contraseña
      if (username.length < 5 || password.length < 8) {
        return res.render('register', { title: 'Register', message: 'Username must be at least 5 characters and password at least 8 characters' });
      }
      users.push({ username, password });
      fs.writeFile(usersFilePath, JSON.stringify({ users }), (err) => {
        if (err) throw err;
        req.session.user = { username, password };
        res.redirect('/user');
      });
    }
  });
}

module.exports = { authenticate, login, register }; // Exporta las funciones para usarlas en las rutas
