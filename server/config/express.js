var express = require('express'), // Web Application Module
    stylus = require('stylus'), // CSS Module
    logger = require('morgan'), // Logging Module
    bodyParser = require('body-parser'),// Middleware required by other modules
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {


    function compile(str, path) { // Stylus Compile Function
        return stylus(str).set('filename', path);
    }

    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({secret: 'rafaelcarvalhaespossas', resave: false, saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.set('view engine', 'ejs');
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(function (req, res, next) {
        next();
    });
    app.use(express.static(config.rootPath + '/public/'));


}
