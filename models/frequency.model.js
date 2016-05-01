var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var frequencySchema = new Schema({
  word: String,
  value: Number,
  date: Date
})
var Frequency = mongoose.model('Frequency', frequencySchema);

module.exports = Frequency;