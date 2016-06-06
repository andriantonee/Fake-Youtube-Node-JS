var router = require('../../routers/admin/router'),
	nunjucks = require('nunjucks'),
	middleware;

middleware = function(app){
	router(app);
	nunjucks.configure('app',{
		autoescape: true,
		express: app
	});
};

module.exports = middleware;