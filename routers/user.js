var h = require('../handlers'),
	router;

router = function(app, express){
	var r = express.Router();

	r.get('/', h.user.home);
	r.get('/music/category', h.user.music_category);
	app.use(r);	
};

module.exports = router;