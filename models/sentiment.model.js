var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Sentiment = new Schema({
    value: Number,
    date: Date
})

module.exports = Sentiment;