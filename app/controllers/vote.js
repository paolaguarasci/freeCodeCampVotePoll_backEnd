/*jshint node: true*/
'use strict';

var Vote = require('../models/vote');

// Create endpoint /api/beers for POSTS
exports.postVotes = function(req, res) {
    // votesRoute.post(function(req, res) {
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
};

// Create endpoint /api/beers for GET
exports.getVotes = function(req, res) {
    // Use the Beer model to find all beer
    Vote.find(function(err, votes) {
        if (err)
            res.send(err);

        res.json(votes);
    });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getVote = function(req, res) {
    // Use the Beer model to find a specific beer
    Vote.findById(req.params.vote_id, function(err, vote) {
        if (err)
            res.send(err);

        res.json(vote);
    });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putVote = function(req, res) {
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
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteVote = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Vote.findByIdAndRemove(req.params.vote_id, function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Vote removed from the locker!'
        });
    });
};
