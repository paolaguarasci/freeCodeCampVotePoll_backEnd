/*jshint node: true*/

/*
BOOTSTRAP APP
*/

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();


// middleware

// static file


// Start app on port 3000
app.listen(3000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server in attesa sulla porta 3000');
    }
});
