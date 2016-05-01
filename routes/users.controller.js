var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');

var convert2Array = function(obj) {
	var arr2rtrn = []
	var keys = Object.keys(obj)
	keys.forEach(function(key){
		arr2rtrn.push([key, obj[key]])
	})
	//console.log("arr", arr2rtrn)
	return arr2rtrn;
} 

/* GET users listing. */

//TODO add API for getting user info
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;

	User.findOne({username : user.username}, function(err, existingUser) {
		if(err) {
			res.send(err);
		}

		// if user exists, deny entry
		if(existingUser){
			res.json(user.username + " already exists");
		}
		// else, create new user
		else {
			user.frequency = [];
			user.sentiment = [];

			user.save(function(err, user){
				if(err) res.send(err);
				res.json(user);
			});
		}
	});
});

// user prefix /users/ to denote we're getting information about a specific user
router.get('/users/:username', function(req, res){
	var username = req.username;
	User.findOne({username}, function(err, user) {
		if(err) res.send(err);
		else if(!user){
			res.send("User not found");
		}
		// no problem finding user
		res.send(user);
	});
});

// maybe TODO - maybe write "get user from :user_id"
// router.put(function(req, res) {
// 	User.findById(req.params.user_id, function(err, user) {

// 	})
// })

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/* USER statistics */

/* dummy PUT for Alex */
router.put('/test', function(req, res, next) {
	var nastyArray = req.body;
	var targetArr = convert2Array(nastyArray);
	var storeTuple = {};
	var now = Date.now();
	var user = new User();

	console.log(targetArr);

	for(var i=0; i<targetArr.length; i++){

		//var smallArr = targetArr[i];
		//var test = {1, new Date()};
			console.log(targetArr[i][0]);
			console.log(user.sentiments);
			var sentiment = {};
			user.sentiments.push(sentiment);

		if(targetArr[i][0] ==='tnemitnes'){
			// add to sentiment value
			//user.sentiment.push({Number(targetArr[i][1]), new Date()});
		}
		// add to work frequency array
		//user.frequency.push({targetArr[i][0], Number(targetArr[i][1]), now});
	}

		// create tuple with 0th element (word) and 1st element (value)
		// targetArr.push({
		// 	"word"      :arr[i][0], 
		// 	"frequency" :arr[i][1]
		// });

	res.send();

});

/* PUT dashboard page */
router.put('/users/:username/statistics', function(req, res, next) {
	var nastyArray = req.body;
	var betterArray = convert2Array(nastyArray);

	var user = User.findById(req.params.user_id, function(err, user){
		if(err) res.send(err);
		else if(!user) res.send("user doesn't exist!");
	});
		// [
		//	[ 'word', '999']
		//      ...
		//  [  'word1', '10' ]
		// ]

	var storeTuple = {};
	var now = Date.now();

	console.log(targetArr[i][1]);

	for(var i=0; i<arr.length; i++){
		if(targetArr[i][0]==='tnemitnes'){
			// add to sentiment value
			//user.sentiment.push({Number(targetArr[i][1]), now});
		}
		// add to work frequency array
		//user.frequency.push(storeTuple = {targetArr[i][0], targetArr[i][1], now});
	}

		// create tuple with 0th element (word) and 1st element (value)
		// targetArr.push({
		// 	"word"      :arr[i][0], 
		// 	"frequency" :arr[i][1]
		// });

	res.send(user);

});

// accessible at /users/:username/stastics/

router.get('/users/:username/frequency/day', function(req, res){
	var bigArr = [];
	var username = req.username;
	User.findOne({username}, function(err, user){
		if(err) 		res.send(err);	
		else if(!user) 	res.send("User not found");

		// gather all sentiments within a week from today

		var sentiments = user.sentiments
		var total = 0;

		for (sentiment in sentiments){
			//do stuff
		}


	

	});

	res.send("something");

	//bigArr has 3-tuples. we just want to send frequencies of pertinent dates
	bigArr = user.frequencies;

	var targetArr = [];

	bigArr.map(function(obj){
		//{word, freq, date}
		var date = obj[1]; // get the second object, Date

		// compare given date with TODAY

		// TODO - may cause issues
		var today = Date().getDay();
		if (date.getDay() == today) {
			console.log("comparing " + date.getDay() + " to " + today);
			// we found the date we were looking for
			targetArr.push({word, freq});
		}

	});

	console.log("done - ", targetArr);

})

router.post
module.exports = router;


