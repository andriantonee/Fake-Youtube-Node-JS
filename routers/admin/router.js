var h = require('../../handlers/admin/handler'),
	router;

router = function(app, express){
	var r = express.Router();

	r.get('/', h.login);
	r.get('/home', h.home);
	r.post('/authentication', h.authentication);
	app.use(r);	
};

module.exports = router;