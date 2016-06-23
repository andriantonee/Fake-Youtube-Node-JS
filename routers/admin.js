var h = require('../handlers'),
	router;

router = function(app, express){
	var r = express.Router();

	r.get('/hidden', h.admin.login);
	r.get('/hidden/home', h.admin.home);
	r.get('/hidden/music/category', h.admin.music_category);
	r.post('/hidden/authentication', h.admin.authentication);
	r.post('/hidden/logout', h.admin.logout);
	r.post('/hidden/music/category/add', h.admin.music_category_add);
	app.use(r);	
};

module.exports = router;