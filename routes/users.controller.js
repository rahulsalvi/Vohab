var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');
var Frequency = require('../models/frequency.model.js');
var Sentiment = require('../models/sentiment.model.js');
var senString = 'tnemitnes';


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
	console.log(req.body);
	
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


/* USER statistics */

/* PUT dashboard page */
router.put('/users/:username/statistics', function(req, res, next) {
	var obj = req.body;
	var arr = convert2Array(obj);

	User.findById(req.params.user_id, function(err, user){
		if(err) res.send(err);
		else if(!user) res.send("user doesn't exist!");

		//else, user is available
		var now = Date.now();

		for(var i=0; i<arr.length; i++){
			if(arr[i][0] === senString) {
				// grab the string->num
				var s = new Sentiment();
				s.value = Number(arr[i][1]);
				s.date  = now;
				user.sentiment.push(s);
			}

			var f = new Frequency();
			f.word = arr[i][0];
			f.value = Number(arr[i][1]);
		}
	});
	
	res.send(user);
});

// accessible at /users/:username/stastics/
router.get('/users/:username/frequency/today', function(req, res){
	var username = req.username;
	var sendObj;
	User.findOne({username}, function(err, user){
		if(err) 		res.send(err);	
		else if(!user) 	res.send("User not found");

		// gather all sentiments within a week from today
		var sentimentsArray   = user.sentiments
		var sentimentsAverage = 0;

		sentimentsArray.map(function(elem){
			sentimentsAverage += elem;
		});
		sendObj = 
		[
			["TUNA", 200]
		];

		res.send(sendObj);

	});
});

// frequency week
router.get('/users/:username/frequency/week', function(req, res){
	var username = req.username;
	var sendObj;
	User.findOne({username}, function(err, user){
		if(err) 		res.send(err);	
		else if(!user) 	res.send("User not found");

		// gather all sentiments within a week from today
		var sentimentsArray   = user.sentiments
		var sentimentsAverage = 0;

		sentimentsArray.map(function(elem){
			sentimentsAverage += elem;
		});

		var userWords = user.frequencies;

		sendObj = 
		[
			userWords
		];

		res.send(sendObj);

	});
});

// if we want frequency month

// tone day
router.get('/users/:username/tone/today', function(req, res){
	var username = req.username;
	var sendObj;
	User.findOne({username}, function(err, user){
		if(err) 		res.send(err);	
		else if(!user) 	res.send("User not found");

		// gather all sentiments within a week from today
		var sentimentsArray   = user.sentiments
		var sentimentsAverage = 0;

		sentimentsArray.map(function(elem){
			sentimentsAverage += elem;
		});
		sendObj = 
		[
			["tone", sentimentsAverage]
		];

		res.send(sendObj);

	});
});

// tone week
router.get('/users/:username/tone/week', function(req, res){
	var username = req.username;
	var sendObj;
	User.findOne({username}, function(err, user){
		if(err) 		res.send(err);	
		else if(!user) 	res.send("User not found");

		// gather all sentiments within a week from today
		var sentimentsArray   = user.sentiments
		var sentimentsAverage = 0;

// TODO logic 
		sentimentsArray.map(function(elem){
			sentimentsAverage += elem;
		});
		sendObj = 
		[
			["tone", sentimentsAverage]
		];

		res.send(sendObj);

	});
});

// tone month
router.get('/users/:username/tone/month', function(req, res){
	var username = req.username;
	var sendObj;
	User.findOne({username}, function(err, user){
		if(err) 		res.send(err);	
		else if(!user) 	res.send("User not found");

		// gather all sentiments within a week from today
		var sentimentsArray   = user.sentiments;
		var sentimentsAverage = 0;

// TODO logic
		sentimentsArray.map(function(elem){
			sentimentsAverage += elem;
		});


		sendObj = 
		[
			["tone", sentimentsAverage]
		];

		res.send(sendObj);

	});
});

//done

//curl -H "Content-Type: application/json" -X PUT -d '{}' http://localhost:3000/users/swear/brett

router.put('/swear/:username/', function(req, res){
	var username = req.username;
	User.findOne({username}, function(err, user){
		if(err) 		res.send(err);	
		else if(!user) 	res.send("User not found");
		
		var f = new Frequency();
		f.word = "firetruck";
		f.value = 20;
		f.date = new Date();
		user.frequencies.push(f);

		f.word = "kitten";
		f.value = 10;
		user.frequencies.push(f);

		res.send({});

	});
});
	// res.send("something");

	// //bigArr has 3-tuples. we just want to send frequencies of pertinent dates
	// bigArr = user.frequencies;

	// var targetArr = [];

	// bigArr.map(function(obj){
	// 	//{word, freq, date}
	// 	var date = obj[1]; // get the second object, Date

	// 	// compare given date with TODAY

	// 	// TODO - may cause issues
	// 	var today = Date().getDay();
	// 	if (date.getDay() == today) {
	// 		console.log("comparing " + date.getDay() + " to " + today);
	// 		// we found the date we were looking for
	// 		targetArr.push({word, freq});
	// 	}

	// });

	// console.log("done - ", targetArr);

router.post
module.exports = router;













// /* dummy PUT for Alex */
// router.put('/test', function(req, res, next) {
// 	var nastyArray = req.body;
// 	var targetArr = convert2Array(nastyArray);
// 	var storeTuple = {};
// 	var now = Date.now();
// 	var user = new User();

// 	console.log(targetArr);

// 	for(var i=0; i<targetArr.length; i++){

// 		//var smallArr = targetArr[i];
// 		//var test = {1, new Date()};
// 			console.log(targetArr[i][0]);
// 			console.log(user.sentiments);
// 			var sentiment = {};
// 			user.sentiments.push(sentiment);

// 		if(targetArr[i][0] ==='tnemitnes'){
// 			// add to sentiment value
// 			//user.sentiment.push({Number(targetArr[i][1]), new Date()});
// 		}
// 		// add to work frequency array
// 		//user.frequency.push({targetArr[i][0], Number(targetArr[i][1]), now});
// 	}

// 		// create tuple with 0th element (word) and 1st element (value)
// 		// targetArr.push({
// 		// 	"word"      :arr[i][0], 
// 		// 	"frequency" :arr[i][1]
// 		// });

// 	res.send();

// });


