var knex = require('knex')({
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'knexuser',
			password : '12345',
			database : 'knextest'
		}
	}),
	jwt = require('jsonwebtoken'),
	config = require('../../config/admin/config');

var variabel_home = {
		header : {
			sidebar : {
				"index.html" : "active"
			}
		},
	};

var variabel_login = {

	};

authentication = function(req, res){
	knex.select('username', 'password')
		.table('user')
		.where({
			username: req.body.username
		})
		.then(function(rows){
			if (rows.length === 0){
				res.json({
					success : false,
					message : 'username atau password salah'
				});
			}
			else if (rows) {
				if (rows[0].password != req.body.password){
					res.json({
						success : false,
						message : 'username atau password salah'
					});
				}
				else{
					if (req.cookies.tid === undefined){
						var profile = {
							username : rows[0].username
						};

						var token = jwt.sign(profile, config.secret, {
							algorithm: 'HS256',
							expiresIn: (1*60*60)
						});

						// Cookie expires in 1 hour
						res.cookie('tid', token, {
								expires : new Date(Date.now() + (1*60*60*1000)),
								httpOnly : true
							})
							.json({
								success: true,
								message: 'Authentication success.'
							})
					}
				}
			}
		});
};

login = function(req, res){
	res.render('./admin/pages/login/login.html', {variabel_login : variabel_login});
};

home = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/');
			}
			else{
				req.decoded = decoded;    
				res.render('./admin/pages/home/home.html', {variabel_home : variabel_home});
				// next();
      		}
    	});
	}
	else{
		res.redirect('/');
	}
};

handler = {
	login: login,
	home: home,
	authentication: authentication
};

module.exports = handler;