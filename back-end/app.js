var createError = require('http-errors');
const express = require('express');
var path = require('path');
var logger = require('morgan');
const multer = require('multer');
const cookieParser = require('cookie-parser')
var app = express();
const cors = require('cors');
const authentication = require('./middlewares/authentication');

app.use(cors());


var indexRouter = require('./routes/manual')
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/login')
var manual2 = require('./routes/manual2')
var francis = require('./routes/francis')
var bearingManual = require('./routes/bearingManual')
var Chart = require('./routes/Chart')
var powerExRoute = require('./routes/PowerExRoute')
// view engine setup

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
 
app.use('/loginRouter',loginRouter)
app.use('/manual',manual2)
app.use('/chart', Chart)
app.use('/francis',francis)
app.use('/bearingManual',bearingManual)
// app.use(authentication);
app.use('/',indexRouter)
app.use('/registerRouter',registerRouter)
app.use('/powerEx',powerExRoute)

 


app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
  });


module.exports = app;