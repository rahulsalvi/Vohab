var express = require('express');
var router = express.Router();

var User = require("../models/user.model.js");
var obj = {
  "is": "1",
  "in": "1",
  "be": "2",
  "forty": "1",
  "years": "1",
  "smoking": "1",
  "pictures": "1",
  "fifty": "1",
  "this": "1",
  "how": "1",
  "do": "1",
  "of": "2",
  "to": "1",
  "&lt;profanity&gt;shit&lt;/profanity&gt;": "1",
  "like": "1",
  "big": "1",
  "gonna": "2",
  "planet": "1",
  "it's": "1",
  "bowl": "1",
  "a": "1",
  "tnemitnes": "0.7207354",
  "you": "1"
}


var bad =  
[ 
  [ 'is', '1' ],
  [ 'in', '1' ],
  [ 'be', '2' ],
  [ 'forty', '1' ],
  [ 'years', '1' ],
  [ 'smoking', '1' ],
  [ 'pictures', '1' ],
  [ 'fifty', '1' ],
  [ 'this', '1' ],
  [ 'how', '1' ],
  [ 'do', '1' ],
  [ 'of', '2' ],
  [ 'to', '1' ],
  [ '&lt;profanity&gt;shit&lt;/profanity&gt;', '1' ],
  [ 'like', '1' ],
  [ 'big', '1' ],
  [ 'gonna', '2' ],
  [ 'planet', '1' ],
  [ 'it\'s', '1' ],
  [ 'bowl', '1' ],
  [ 'a', '1' ],
  [ 'tnemitnes', '0.7207354' ],
  [ 'you', '1' ] 
];

var convert2Array = function(obj) {
	var arr2rtrn = []
	var keys = Object.keys(obj)
	keys.forEach(function(key){
		arr2rtrn.push([key, obj[key]])
	})
	//console.log("arr", arr2rtrn)
	return arr2rtrn;
} 


/* GET dashboard page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { dashboard: 'DASHBOARD CAT' });
});






/* POST dashboard page */
router.put('/', function(req, res, next) {
	var arr = convert2Array(obj);
	var targetArr = [];
		// [
		//	[ 'word', '999']
		//      ...
		//  [  'word1', '10' ]


	for(var i=0; i<arr.length; i++){

		
	}

		// create tuple with 0th element (word) and 1st element (value)
		// targetArr.push({
		// 	"word"      :arr[i][0], 
		// 	"frequency" :arr[i][1]
		// });

	res.send();

})


router.post('/freq', function(req, res, next) {
	
	var obj = req.body;
	var parsed = JSON.stringify(obj);

	console.log("yooo",Number(obj.is));

	
	// next();
})



module.exports = router;


 // console.log(pair);
	// 	var word = pair[0];
	// 	var val = pair[1];