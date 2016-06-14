var h = require('../../handlers/admin/handler'),
	router;

router = function(app, express){
	var r = express.Router();

	r.get('/', h.login);
	r.get('/home', h.home);
	app.use(r);
};

module.exports = router;