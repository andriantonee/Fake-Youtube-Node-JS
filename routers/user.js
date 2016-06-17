var h = require('../handlers'),
	router;

router = function(app, express){
	var r = express.Router();

	r.get('/', h.user.home);
	app.use(r);	
};

module.exports = router;