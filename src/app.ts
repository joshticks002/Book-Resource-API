const { errorHandler } = require('./middleware/errorHandler');
const dotenv = require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import { Request, Response, NextFunction } from "express";
import { IncomingMessage } from "http";

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/', indexRouter);
app.use('/', indexRouter);
app.use('/api/books', indexRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler)
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('404', { 
        title: 'Error', 
        message: 'OOPS, page not found :)' 
    })
    next()
})

export default app;
