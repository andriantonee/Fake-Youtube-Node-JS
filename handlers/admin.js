var active_sidebar = function(){
		var obj = {
			"dashboard" : "",
			"music_li" : "",
			"music_li_a" : "",
			"music_li_a_ul" : "",
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
		token = req.cookies.tid;

	/* Untuk menandakan bahwa sidebar sedang aktif dibagian mana */
	music_category.header.active_sidebar.music_li = "class=active";
	music_category.header.active_sidebar.music_li_a = "aria-expanded=true";
	music_category.header.active_sidebar.music_li_a_ul = "in";
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
};

music_list = function(req, res){
	var music_list = {
			header : {
				header_notification : {
					"username" : "undefined"
				},
				active_sidebar : active_sidebar()
			},
			music_category_combobox : []
		},
		token = req.cookies.tid;

	/* Untuk menandakan bahwa sidebar sedang aktif dibagian mana */
	music_list.header.active_sidebar.music_li = "class=active";
	music_list.header.active_sidebar.music_li_a = "aria-expanded=true";
	music_list.header.active_sidebar.music_li_a_ul = "in";
	music_list.header.active_sidebar.music_list = "active";

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				music_list.header.header_notification["username"] = decoded.username;

				knex.select('category')
					.table('music_category')
					.orderBy('tanggal_waktu')
					.then(function(rows){
						if (rows.length === 0){
							res.render('./admin/pages/music/music_list.html', {music_list : music_list});
						}
						else{
							res.redirect('/hidden/music/list/' + rows[0].category);
						}
					})
					.catch(function(err){
						res.render('./admin/pages/music/music_list.html', {music_list : music_list});
					});
				
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
};

music_list_category = function(req, res){
	var music_list = {
			header : {
				header_notification : {
					"username" : "undefined"
				},
				active_sidebar : active_sidebar()
			},
			music_category_combobox : []
		},
		token = req.cookies.tid;

	/* Untuk menandakan bahwa sidebar sedang aktif dibagian mana */
	music_list.header.active_sidebar.music_li = "class=active";
	music_list.header.active_sidebar.music_li_a = "aria-expanded=true";
	music_list.header.active_sidebar.music_li_a_ul = "in";
	music_list.header.active_sidebar.music_list = "active";

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				music_list.header.header_notification["username"] = decoded.username;

				knex.select('category')
					.table('music_category')
					.orderBy('tanggal_waktu')
					.then(function(rows){
						music_list.music_category_combobox = rows;
						for(i = 0; i < music_list.music_category_combobox.length; i++){
							if(music_list.music_category_combobox[i].category === req.params["category"]){
								music_list.music_category_combobox[i].selected = "selected=selected";
							}
							else{
								music_list.music_category_combobox[i].selected = "";
							}
						};
						
						res.render('./admin/pages/music/music_list.html', {music_list : music_list});
					})
					.catch(function(err){
						res.render('./admin/pages/music/music_list.html', {music_list : music_list});
					});
				
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
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
										message : 'Data telah berhasil diinput !'
									});
								})
								.catch(function(err){
									res.json({
										success : false,
										message : 'Maaf, terjadi kesalahan pada saat penginputan data.'
									});
								});
						}
						else{
							res.json({
								success : false,
								message : 'Category ' + req.body.music_category + ' sudah terdaftar. Jika pada tabel dibawah tidak tercantum silahkan melakukan refresh page.'
							})
						}
					})
					.catch(function(err){
						res.json({
							success : false,
							message : 'Maaf, terjadi kesalahan pada saat penginputan data.'
						});
					});
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
};

music_category_delete = function(req, res){
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
							res.json({
								success : false,
								message : 'Category ' + req.body.music_category + ' tidak terdaftar. Jika pada tabel dibawah tercantum silahkan melakukan refresh page.'
							});
						}
						else{
							knex('music_category')
								.where({
									category : req.body.music_category
								})
								.del()
								.then(function(success){
									if (success === 1){
										res.json({
											success : true,
											message : 'Data telah berhasil dihapus !'
										});
									}
									else{
										res.json({
											success : false,
											message : 'Maaf, terjadi kesalahan pada saat penghapusan data.'
										})
									}
								})
								.catch(function(err){
									res.json({
										success : false,
										message : 'Maaf, terjadi kesalahan pada saat penghapusan data.'
									});
								});
						}
					})
					.catch(function(err){
						res.json({
							success : false,
							message : 'Maaf, terjadi kesalahan pada saat penghapusan data.'
						});
					});
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
};

music_list_add = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				knex.select()
					.table('music_list')
					.where({
						music_title: req.body.music_title,
						music_singer: req.body.music_singer
					})
					.then(function(rows){
						if (rows.length === 0){
							knex('music_list')
								.insert({
									music_category : req.body.music_category,
									music_title : req.body.music_title,
									music_singer : req.body.music_singer,
									album_image_filename : req.file !== undefined ? req.file.filename : "",
									album_image_originalname : req.file !== undefined ? req.file.originalname : "No Image",
									tanggal_waktu : new Date(Date.now()),
									user : decoded.username
								})
								.then(function(music_category){
									res.json({
										success : true,
										message : 'Data telah berhasil diinput !'
									});
								})
								.catch(function(err){
									res.json({
										success : false,
										message : 'Maaf, terjadi kesalahan pada saat penginputan data.'
									});
								});
						}
						else{
							res.json({
								success : false,
								message : 'Music dengan judul ' + req.body.music_title + '  dan penyanyi ' + req.body.music_singer + ' sudah terdaftar. Jika pada tabel dibawah tidak tercantum silahkan melakukan refresh page.'
							})
						}
					})
					.catch(function(err){
						res.json({
							success : false,
							message : 'Maaf, terjadi kesalahan pada saat penginputan data.'
						});
					});
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
	// console.log(req.file);
	// console.log(req.body.music_category);
	// console.log(req.body.music_title);
	// console.log(req.body.music_singer);
};

handler = {
	login : login,
	home : home,
	music_category : music_category,
	music_list_category : music_list_category,
	music_list : music_list,
	authentication : authentication,
	logout : logout,
	music_category_add : music_category_add,
	music_category_delete : music_category_delete,
	music_list_add : music_list_add
};

module.exports = handler;