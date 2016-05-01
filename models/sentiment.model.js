var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var sentimentSchema = new Schema({
    value: Number,
    date: Date
});

var Sentiment = mongoose.model('Sentiment', sentimentSchema);
module.exports = Sentiment;