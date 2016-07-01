var router = require('../routers'),
	nunjucks = require('nunjucks'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	multer = require('multer'),
	pg = require('pg'),
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
	app.use(function(req, res, next) {
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	    next();
	});

	pg.defaults.ssl = true;
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		console.log('Connected to postgres! Getting schemas...');

		client
		.query('SELECT * FROM user')
		.on('row', function(row) {
			console.log(JSON.stringify(row));
		});
	});

	router.admin(app, express, upload);
	router.user(app, express);

	nunjucks.configure('app',{
		autoescape: true,
		express: app
	});
};

module.exports = middleware;