var router = require('../../routers/admin/router'),
	nunjucks = require('nunjucks'),
	middleware;

middleware = function(app, globdir, express){
	router(app, express);

	nunjucks.configure('app',{
		autoescape: true,
		express: app
	});
	
	app.use(express.static(globdir + '/public'));
	app.use('/node_modules', express.static(globdir + '/node_modules'));
};

module.exports = middleware;