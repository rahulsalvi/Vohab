var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  password: String,
  
  frequency: [{ 
  	type: String,
  	type: Number,
  	type: Date
  }];

  sentiment: [{
  	types: Number,
  	type: Date
  }];


});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;