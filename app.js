/*jshint node: true*/
'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var _ = require('lodash');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoURL = 'mongodb://ahiv:ahiv@ds021026.mlab.com:21026/ahivelasquez';
var port = process.env.PORT || 3000;
var Vote = require('./app/models/vote');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('X-HTTP-Method-Override'));

// add CORS support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Create a new route with the prefix /beers
var votesRoute = router.route('/votes');
// Create a new route with the /beers/:beer_id prefix
var voteRoute = router.route('/votes/:vote_id');

// connect to mongoDB
mongoose.connect(mongoURL);
mongoose.connection.once('open', function() {
    // load models
    app.models = require('./app/models/index');

    // load routes
    var routes = require('./app/routes');
    // _.each(routes, function(controller, route) {
    //     app.use(route, controller(app, route));
    // });
    // Register all our routes with /api
    app.use('/api', routes);

    app.listen(port, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Server in ascolto sulla porta 3000');
        }
    });
});
