const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors=require('cors');
const auth=require('./middlewares/auth');
const Role=require('./enum/role');

const indexRouter = require('./routes/index');``
const jobOpeningRouter=require('./routes/jobOpenings');

require("dotenv").config();
require('./config/passport');

//DB Connection
const db=require('./database/db');
db.connectToDB(process.env.MONGODB_CONNECTION_URL);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Route middlewares
app.use('/', indexRouter);
app.use('/auth',require('./routes/auth'));
app.use('/jobOpenings',jobOpeningRouter);
app.use('/employee',auth.authorize(Role.Manager),require('./routes/employee'));

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
  // res.status(err.status || 500);
  // res.render('error');
  res.status(err.status || 500);
  res.render('pages/error/error',{page:err.status || 500 ,menuId:err.status,status:err.status,message:err.message});
});

module.exports = app;
