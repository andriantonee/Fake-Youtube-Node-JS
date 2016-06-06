var express = require('express'),
	r = express.Router(),
	h = require('../../handlers/admin/handler'),
	router;

router = function(app){
	r.get('/', h.home);
	app.use(r);
};
module.exports = router;