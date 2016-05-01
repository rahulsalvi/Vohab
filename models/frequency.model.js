var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Frequency = new Schema({
  word: String,
  value: Number,
  date: Date
})

module.exports = Frequency;