// load all env variable from .env file into process.env object
require('dotenv').config();

// Database setup 
var bodyParser = require('body-parser');
var cors = require('cors')

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var testApiRouter = require('./routes/testApi');
// var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/hello', indexRouter);
app.use('/test', testApiRouter);
// app.use('/users', usersRouter);


// Database setup Heroku


// Heroku Express/React deployment
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Hanlde react routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


module.exports = app;
