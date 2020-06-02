var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/hello', indexRouter);
// app.use('/users', usersRouter);

// Setup Database
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres://glkzskfvfckaux:664475a22db2fc50717b1bfc4ca116ebe65f683f4fcdf9e4ed565da0ea50b48f@ec2-35-169-254-43.compute-1.amazonaws.com:5432/d7ppsjuvp4hof1');

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });



if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Hanlde react routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


module.exports = app;
