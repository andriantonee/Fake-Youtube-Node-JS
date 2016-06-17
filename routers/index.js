var admin = require('./admin'),
	user = require('./user'),
	router;

router = {
	admin : admin,
	user : user	
};

module.exports = router;