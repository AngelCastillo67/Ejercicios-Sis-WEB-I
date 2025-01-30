var createError = require('http-errors'); // Manejo de errores HTTP
var express = require('express'); // Framework Express
var path = require('path'); // Módulo para trabajar con rutas de archivos
var cookieParser = require('cookie-parser'); // Middleware para parsear cookies
var logger = require('morgan'); // Middleware para loguear peticiones HTTP
var session = require('express-session'); // Middleware para manejar sesiones
const bodyParser = require('body-parser'); // Middleware para parsear el cuerpo de las peticiones
const User = require('./models/user'); // Modelo de usuario

// Importación de rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var userRouter = require('./routes/user');
var chatRouter = require('./routes/chat');

var app = express(); // Inicializa la aplicación Express

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev')); // Loguea peticiones HTTP
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: false })); // Parsear URL-encoded
app.use(cookieParser()); // Parsear cookies
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos
app.use(bodyParser.json()); // Parsear el cuerpo de las peticiones

// Configuración de sesiones
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Uso de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);

(async () => {
  await User.sync({ force: true }); // Sync the database

  app.post('/users', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });

  // Manejo de errores 404
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // Manejador de errores
  app.use(function(err, req, res, next) {
    // Configura locales, solo proporcionando error en desarrollo
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Renderiza la página de error
    res.status(err.status || 500);
    res.render('error');
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})();

module.exports = app; // Exporta la aplicación para usarla en otros archivos
