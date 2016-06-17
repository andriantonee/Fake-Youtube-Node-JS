var h = require('../handlers'),
	router;

router = function(app, express){
	var r = express.Router();

	r.get('/hidden', h.admin.login);
	r.get('/hidden/home', h.admin.home);
	r.post('/hidden/authentication', h.admin.authentication);
	app.use(r);	
};

module.exports = router;