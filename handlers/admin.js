var active_sidebar = function(){
		var obj = {
			"dashboard" : "",
			"music" : "",
			"music_category" : "",
			"music_list" : ""
		};

		return obj;
	},
	knex = require('knex')({
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'knexuser',
			password : '12345',
			database : 'knextest'
		}
	}),
	jwt = require('jsonwebtoken'),
	config = require('../config/admin');

login = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .render('./admin/pages/login/login.html', {});
			}
			else{
				res.redirect('/hidden/home');
      		}
    	});
	}
	else{
		res.clearCookie('tid')
           .render('./admin/pages/login/login.html', {});;
	}
};

home = function(req, res){
	var home = {
			header : {
				header_notification : {
					"username" : "undefined"
				},
				active_sidebar : active_sidebar()
			}
		},
		token = req.cookies.tid;

	/* Untuk menandakan bahwa sidebar sedang aktif dibagian mana */
	home.header.active_sidebar.dashboard = "active";

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				home.header.header_notification["username"] = decoded.username;
				res.render('./admin/pages/home/home.html', {home : home});
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
};

music_category = function(req, res){
	var music_category = {
			header : {
				header_notification : {
					"username" : "undefined"
				},
				active_sidebar : active_sidebar()
			},
			music_category_table : []
		},
		token = req.cookies.tid;;

	/* Untuk menandakan bahwa sidebar sedang aktif dibagian mana */
	music_category.header.active_sidebar.music = "in";
	music_category.header.active_sidebar.music_category = "active";

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				music_category.header.header_notification["username"] = decoded.username;
				
				knex.select('category')
					.table('music_category')
					.orderBy('tanggal_waktu')
					.then(function(rows){
						music_category.music_category_table = rows;
						res.render('./admin/pages/music/music_category.html', {music_category : music_category});
					})
					.catch(function(err){
						res.render('./admin/pages/music/music_category.html', {music_category : music_category});
					});
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
}

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
					message : 'Username atau Password salah !'
				});
			}
			else if (rows) {
				if (rows[0].password != req.body.password){
					res.json({
						success : false,
						message : 'Username atau Password salah !'
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
								message: 'Authentication success !'
							});
					}
				}
			}
		})
		.catch(function(err){
			res.json({
				success : false,
				message : 'Something error occured'
			});
		});
};

logout = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		res.clearCookie('tid')
	       .redirect('/hidden');
	}
	else{
		res.redirect('/hidden');
	}
};


music_category_add = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				knex.select()
					.table('music_category')
					.where({
						category: req.body.music_category
					})
					.then(function(rows){
						if (rows.length === 0){
							knex('music_category')
								.insert({
									category : req.body.music_category,
									tanggal_waktu : new Date(Date.now()),
									user : decoded.username
								})
								.then(function(music_category){
									res.json({
										success : true,
										message : 'data berhasil diinput'
									});
								})
								.catch(function(err){
									res.json({
										success : false,
										message : 'data tidak berhasil diinput'
									});
								});
						}
					})
					.catch(function(err){
						res.json({
							success : false,
							message : 'table tidak ditemukan'
						});
					});
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
};

handler = {
	login : login,
	home : home,
	music_category : music_category,
	authentication : authentication,
	logout : logout,
	music_category_add : music_category_add
};

module.exports = handler;