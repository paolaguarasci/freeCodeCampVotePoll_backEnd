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

// router.get('/', function(req, res) {
//     res.json({
//         message: 'You are running dangerously low on beer!'
//     });
// });

// Register all our routes with /api
app.use('/api', router);

// -- New Code Below Here -- //

// Create a new route with the prefix /beers
var votesRoute = router.route('/votes');

// Create endpoint /api/beers for POSTS
votesRoute.post(function(req, res) {
    // Create a new instance of the Beer model
    var vote = new Vote();

    // Set the beer properties that came from the POST data
    vote.name = req.body.name;
    vote.opt = req.body.opt.split('\n');
    vote.val = [];

    // Save the beer and check for errors
    vote.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Votepoll added!',
            data: vote
        });
    });
});

// Create endpoint /api/beers for GET
votesRoute.get(function(req, res) {
    // Use the Beer model to find all beer
    Vote.find(function(err, votes) {
        if (err)
            res.send(err);

        res.json(votes);
    });
});

// Create a new route with the /beers/:beer_id prefix
var voteRoute = router.route('/votes/:vote_id');

// Create endpoint /api/beers/:beer_id for GET
voteRoute.get(function(req, res) {
    // Use the Beer model to find a specific beer
    Vote.findById(req.params.vote_id, function(err, vote) {
        if (err)
            res.send(err);

        res.json(vote);
    });
});

// Create endpoint /api/beers/:beer_id for PUT
voteRoute.put(function(req, res) {
    // Use the Beer model to find a specific beer
    Vote.findById(req.params.vote_id, function(err, vote) {
        if (err)
            res.send(err);

        // Update the existing vote data
        vote.name = req.body.name;
        vote.opt = req.body.opt.split('\n');
        vote.val = [];

        // Save the beer and check for errors
        vote.save(function(err) {
            if (err)
                res.send(err);

            res.json(vote);
        });
    });
});

// Create endpoint /api/beers/:beer_id for DELETE
voteRoute.delete(function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Vote.findByIdAndRemove(req.params.vote_id, function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Vote removed from the locker!'
        });
    });
});

// connect to mongoDB
mongoose.connect(mongoURL);
mongoose.connection.once('open', function() {
    // load models
    app.models = require('./app/models/index');

    // // load routes
    // var routes = require('./app/routes');
    // _.each(routes, function(controller, route) {
    //     app.use(route, controller(app, route));
    // });

    app.listen(port, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Server in ascolto sulla porta 3000');
        }
    });
});
