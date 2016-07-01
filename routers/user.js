var h = require('../handlers'),
	router;

router = function(app, express){
	var r = express.Router();

	r.get('/', h.user.home);
	r.get('/music/category', h.user.music_category);
	r.get('/popular/on/web', h.user.popular_on_web);
	r.get('/about/us', h.user.about_us);
	r.get('/play/:music_title/:music_singer', h.user.play);
	r.post('/like', h.user.like);
	app.use(r);	
};

module.exports = router;