/*jshint node: true*/
'use strict';

var voteController = require('./controllers/vote');
var userController = require('./controllers/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var authController = require('./controllers/auth');
// Create endpoint handlers for /votes
router.route('/votes')
    .post(authController.isAuthenticated, voteController.postVotes)
    .get(authController.isAuthenticated, voteController.getVotes);

// Create endpoint handlers for /votes/:vote_id
router.route('/votes/:vote_id')
    .get(authController.isAuthenticated, voteController.getVote)
    .put(authController.isAuthenticated, voteController.putVote)
    .delete(authController.isAuthenticated, voteController.deleteVote);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

module.exports = router;
