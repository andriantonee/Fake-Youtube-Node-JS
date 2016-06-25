var router = require('../routers'),
	nunjucks = require('nunjucks'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	multer = require('multer'),
	middleware;

middleware = function(app, globdir, express){
	var storage = multer.diskStorage({
			destination: globdir + '/public/img/'
		});
	var upload = multer({ storage : storage });

	app.use(express.static(globdir + '/public'));
	app.use('/node_modules', express.static(globdir + '/node_modules'));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(cookieParser());

	router.admin(app, express, upload);
	router.user(app, express);

	nunjucks.configure('app',{
		autoescape: true,
		express: app
	});
};

module.exports = middleware;