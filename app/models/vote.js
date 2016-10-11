/*jshint node: true*/
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    name: String,
    opt: Array,
    val: Array,
    userID: String
});

module.exports = mongoose.model('Vote', VoteSchema);
