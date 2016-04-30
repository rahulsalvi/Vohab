var express = require('express');
var router = express.Router();


/* GET dashboard page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { dashboard: 'DASHBOARD CAT' });
});

var dumbText = 'My, my, my music hits me so hard Makes me say Oh my Lord';

router.post('/', function(req, res, next) {
	var list = req.params.list
	for (var i=0; i<list.length; i++){
    	// here jsonObject['sync_contact_list'][i] is your current "bit"
    	//var key = list[i][key];
	}
})

module.exports = router;
