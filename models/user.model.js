var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Frequency = new Schema({
  word: String,
  freq: Number,
  date: Date
})

var Sentiment = new Schema({
    value: Number,
    date: Date
});
// create a schema
var userSchema = new Schema({
  name: String,
  password: String,
  frequencies: [Frequency],
  sentiments: [Sentiment]


});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;