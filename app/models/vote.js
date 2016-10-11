/*jshint node: true*/
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    name: String,
    option: {
        opt: Array,
        val: Array
    }
});

module.exports = mongoose.model('Vote', VoteSchema);
