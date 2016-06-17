var globaldir = __dirname,
	express = require('express'),
	middleware = require('./middlewares'),
	app = express();

middleware(app, globaldir, express);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
	console.log('Listening at ' + app.get('port'));
});