'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var devMode = true;


//======================================
// Dev Env
//======================================

if ( fs.existsSync( path.resolve(__dirname, './prod.config.json') ) ) { devMode = false; }


//======================================
// Views
//======================================

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//======================================
// Middleware
//======================================

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//======================================
// Route Definitions
//======================================

// dynamic routes
app.use('/auth',    (devMode) ? require('./_mock/routes/auth') : require('./routes/auth') );
app.use('/users',   (devMode) ? require('./_mock/routes/users') : require('./routes/users'));

// static routes
app.use('/',          require('./routes/index'));
app.use('/comments', require('./routes/comment'));
app.use('/countries', require('./routes/countries'));
app.use('/notifications', require('./routes/notifications'));
app.use('/photos',    require('./routes/photos'));
app.use('/states',    require('./routes/states'));

app.use( '/public', express.static(path.join(__dirname, 'public')) );
app.use( express.static(path.resolve(__dirname, '../client')) );

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//======================================
// Error Handler
//======================================

// development
if (devMode) {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

// production
} else {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
