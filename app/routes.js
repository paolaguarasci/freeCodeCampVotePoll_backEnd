/*jshint node: true*/
'use strict';

var voteController = require('./controllers/vote');
var express = require('express');
var router = express.Router();

// Create endpoint handlers for /votes
router.route('/votes')
    .post(voteController.postVotes)
    .get(voteController.getVotes);

// Create endpoint handlers for /votes/:vote_id
router.route('/votes/:vote_id')
    .get(voteController.getVote)
    .put(voteController.putVote)
    .delete(voteController.deleteVote);


module.exports = router;
