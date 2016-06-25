var h = require('../handlers'),
	router;

router = function(app, express, upload){
	var r = express.Router();

	r.get('/hidden', h.admin.login);
	r.get('/hidden/home', h.admin.home);
	r.get('/hidden/music/category', h.admin.music_category);
	r.get('/hidden/music/list', h.admin.music_list);
	r.post('/hidden/authentication', h.admin.authentication);
	r.post('/hidden/logout', h.admin.logout);
	r.post('/hidden/music/category/add', h.admin.music_category_add);
	r.post('/hidden/music/category/delete', h.admin.music_category_delete);
	r.post('/upload', upload.single('image'), h.admin.upload);
	app.use(r);	
};

module.exports = router;