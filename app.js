const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const {expressjwt} = require('express-jwt');
const config = require('config');
const i18n = require('i18n');
//const JwtKey = "c7f6663f925ce99625563a31b3d33adb";
const JwtKey = config.get("secret.key");




const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter = require('./routes/directors');
const actorsRouter = require('./routes/actors');
const genresRouter = require('./routes/genres');
const membersRouter = require('./routes/members');
const moviesRouter = require('./routes/movies');
const copiesRouter = require('./routes/copies');
const bookingsRouter = require('./routes/bookings');
const awaitListsRouter = require('./routes/awaitLists');

const app = express();
//mongodb://<dbUser>?:<dbPass>?@<url>:<port>/<dbName>
//const url = "mongodb://localhost:27017/mongodb"
const url = config.get("dbChain");
mongoose.connect(url);

const db = mongoose.connection;
db.on('open', ()=> {
  console.log("Connection OK");
});

db.on('error', ()=> {
  console.log("Connection Failed")
})

i18n.configure({
  locales:['es','en'], //español,ingles si no viene el lenguaje va a tomar el primero del arreglo 
  cookie:'language',
  directory:`${__dirname}/locales`//ruta donde se encuentran los archivos de locates (__dirname se refiere a donde me encuentro en mi aplicaion estos moementos)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init); //da una funcion que inicializa el proceso de i18n

//app.use(expressjwt({secret:JwtKey,algorithms:['HS256']}).unless({path:['/login']})); 


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors', directorsRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/copies', copiesRouter);
app.use('/bookings',bookingsRouter);
app.use('/awaitLists',awaitListsRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;