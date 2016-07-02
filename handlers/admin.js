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
			user     : 'root',
			password : '',
			database : 'musicvideo'
		}
	}),
	jwt = require('jsonwebtoken'),
	config = require('../config/admin'),
	async = require('async');

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
			},
			total_view : 0,
			total_like : 0,
			lastsync : (new Date(Date.now)).toGMTString()
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

				knex('music_list_view')
					.count('tanggal_waktu as total')
					.then(function(rows){
						home.total_view = rows[0].total

						knex('music_list_like')
							.count('tanggal_waktu as total')
							.then(function(rows){
								home.total_like = rows[0].total

								knex.select()
									.table('lastsync')
									.then(function(rows){
										home.lastsync = rows[0].tanggal_waktu.toGMTString();

										res.render('./admin/pages/home/home.html', {home : home});
									})
									.catch(function(err){
										res.render('./admin/pages/home/home.html', {home : home});
									});
							})
							.catch(function(err){
								res.render('./admin/pages/home/home.html', {home : home});
							});
					})
					.catch(function(err){
						res.render('./admin/pages/home/home.html', {home : home});
					});
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
			music_category_combobox : [],
			music_list_table : []
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
			music_category_combobox : [],
			music_list_table : []
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
				knex.select()
					.table('music_category')
					.where({
						category : req.params["category"]
					})
					.then(function(rows){
						if (rows.length === 0){
							/* mau render page 404 not found */
							// res.status(404);
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
									
									knex.select('music_title','music_singer', 'youtube_video_id', 'lyric','album_image_filename','album_image_originalname')
										.table('music_list')
										.where({
											music_category : req.params["category"]
										})
										.orderBy('tanggal_waktu')
										.then(function(rows){
											// for(i = 0; i < rows.length; i++){
											// 	var obj = {};
											// 	obj.music_title = rows[i].music_title;
											// 	obj.music_singer = rows[i].music_singer;
											// 	if(rows[i].album_image_originalname !== 'No Image'){
											// 		obj.album_image = "<a href=img/" + rows[i].album_image_filename + ">" + rows[i].album_image_originalname + "</a>";
											// 	}
											// 	else{
											// 		obj.album_image = rows[i].album_image_originalname;
											// 	}

											// 	music_list.music_list_table.push(obj);
											// };
											music_list.music_list_table = rows;

											res.render('./admin/pages/music/music_list.html', {music_list : music_list});
										})
										.catch(function(err){
											res.render('./admin/pages/music/music_list.html', {music_list : music_list});
										});
								})
								.catch(function(err){
									res.render('./admin/pages/music/music_list.html', {music_list : music_list});
								});
						}
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
				message : 'Maaf, terdapat suatu kesalahan'
			});
		});
};

logout = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		res.clearCookie('tid')
	       .json({
	       		success : true,
	       		message : 'User telah berhasil logout'
	       })
	}
	else{
		res.json({
			success : true,
			message : 'User telah berhasil logout'
		});
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
							knex.select()
								.table('music_list')
								.where({
									music_category : req.body.music_category
								})
								.then(function(rows){
									if (rows.length === 0){
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
									else{
										res.json({
											success : false,
											message : 'Category ' + req.body.music_category + ' sudah memiliki music list.'
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
						music_title : req.body.music_title,
						music_singer : req.body.music_singer
					})
					.then(function(rows){
						if (rows.length === 0){
							knex('music_list')
								.insert({
									music_category : req.body.music_category,
									music_title : req.body.music_title,
									music_singer : req.body.music_singer,
									youtube_video_id : req.body.youtube_video_id,
									lyric : req.body.lyric,
									album_image_filename : "",
									album_image_originalname : "No Image",
									album_image_path : "",
									tanggal_waktu : new Date(Date.now()),
									user : decoded.username
								})
								.then(function(music_list){
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
};

music_list_upload = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				knex('music_list')
					.where({
						music_title : req.body.music_title,
						music_singer : req.body.music_singer,
					})
					.update({
						album_image_filename : req.file !== undefined ? req.file.filename : "",
						album_image_originalname : req.file !== undefined ? req.file.originalname : "No Image",
						album_image_path : req.file !== undefined ? req.file.path : ""
					})
					.then(function(music_list){
						res.json({
							success : true,
							message : 'Data telah berhasil diupload !'
						});
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

music_list_delete = function(req, res){
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
						music_category : req.body.music_category,
						music_title : req.body.music_title,
						music_singer : req.body.music_singer
					})
					.then(function(rows){
						if (rows.length === 0){
							res.json({
								success : false,
								message : 'Music dengan kategori ' + req.body.music_category + ', judul ' + req.body.music_title + ', dan penyanyi ' + req.body.music_singer + ' tidak terdaftar. Jika pada tabel dibawah tercantum silahkan melakukan refresh page.'
							});
						}
						else{
							if (rows[0].album_image_originalname !== 'No Image'){
								const fs = require('fs');

								fs.stat(rows[0].album_image_path, function(err) {
									/* jika file ditemukan */
								    if (err === null){
								        fs.unlink(rows[0].album_image_path, function(err){
											if (err){
												res.json({
													success : false,
													message : 'Maaf, terjadi kesalahan pada saat penghapusan data.'
												});
											}
											else{
												knex('music_list')
													.where({
														music_category : req.body.music_category,
														music_title : req.body.music_title,
														music_singer : req.body.music_singer
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
								   	/* jika file tidak ditemukan */
								   	else if (err.code == 'ENOENT'){
								   		knex('music_list')
											.where({
												music_category : req.body.music_category,
												music_title : req.body.music_title,
												music_singer : req.body.music_singer
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
								   	/* error lain */
								   	else{
								   		res.json({
											success : false,
											message : 'Maaf, terjadi kesalahan pada saat penghapusan data.'
										});
								   	}
								});
							}
							else{
								knex('music_list')
									.where({
										music_category : req.body.music_category,
										music_title : req.body.music_title,
										music_singer : req.body.music_singer
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

view = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				knex.distinct('music_title','music_singer')
					.select()
					.table('music_list_view')
					.then(function(rows){
						var asyncTasks = [];

						rows.forEach(function(item){
							asyncTasks.push(function(callback){
								knex('music_list_view')
									.where({
										music_title : item.music_title,
										music_singer : item.music_singer
									})
									.del()
									.then(function(rows){
										var value = rows;

										knex.select('view')
											.table('music_list')
											.where({
												music_title : item.music_title,
												music_singer : item.music_singer
											})
											.then(function(rows){
												value += rows[0].view;

												knex('music_list')
													.where({
														music_title : item.music_title,
														music_singer : item.music_singer
													})
													.update({
														view : value
													})
													.then(function(music_list){
														callback();
													})
													.catch(function(err){
														callback();
													});
											})
											.catch(function(err){
												callback();
											});
									})
									.catch(function(err){
										callback();
									});
							});
						});
						async.parallel(asyncTasks, function(){
						  	res.json({
						  		success : true,
						  		message : "Data telah berhasil dipindahkan"
						  	})
						});
					})
					.catch(function(err){
						res.json({
					  		success : false,
					  		message : "Data tidak berhasil dipindahkan"
					  	})
					});
      		}
    	});
	}
	else{
		res.redirect('/hidden');
	}
};

like = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				knex.distinct('music_title','music_singer')
					.select()
					.table('music_list_like')
					.then(function(rows){
						var asyncTasks = [];

						rows.forEach(function(item){
							asyncTasks.push(function(callback){
								knex('music_list_like')
									.where({
										music_title : item.music_title,
										music_singer : item.music_singer
									})
									.del()
									.then(function(rows){
										var value = rows;

										knex.select('like')
											.table('music_list')
											.where({
												music_title : item.music_title,
												music_singer : item.music_singer
											})
											.then(function(rows){
												value += rows[0].like;

												knex('music_list')
													.where({
														music_title : item.music_title,
														music_singer : item.music_singer
													})
													.update({
														like : value
													})
													.then(function(music_list){
														callback();
													})
													.catch(function(err){
														callback();
													});
											})
											.catch(function(err){
												callback();
											});
									})
									.catch(function(err){
										callback();
									});
							});
						});
						async.parallel(asyncTasks, function(){
						  	res.json({
						  		success : true,
						  		message : "Data telah berhasil dipindahkan"
						  	})
						});
					})
					.catch(function(err){
						res.json({
					  		success : false,
					  		message : "Data tidak berhasil dipindahkan"
					  	})
					});
			}
		});
	}
	else{
		res.redirect('/hidden');
	}
};

sync_list = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				knex.select('music_title', 'music_singer', 'youtube_video_id')
					.table('music_list')
					.then(function(rows){
						res.json({
							success : true,
							data : rows,
							message : "sukses mengirimkan data"
						});
					})
					.catch(function(err){
						res.json({
							success : false,
							message : "gagal mengirimkan data"
						});
					});
			}
		});
	}
	else{
		res.redirect('/hidden');
	}
};

sync = function(req, res){
	var token = req.cookies.tid;

	if (token !== undefined){
		jwt.verify(token, config.secret, function(err, decoded) {      
      		if (err){
      			res.clearCookie('tid')
        		   .redirect('/hidden');
			}
			else{
				var music_list = JSON.parse(req.body.music_list);
				var asyncTasks = [];

				music_list.forEach(function(item){
					asyncTasks.push(function(callback){
						knex('music_list')
							.where({
								music_title : item.music_title,
								music_singer : item.music_singer
							})
							.update({
								youtube_view : item.youtube_view
							})
							.then(function(music_list){
								callback();
							})
							.catch(function(err){
								callback();
							});
					});
				});
				async.parallel(asyncTasks, function(){
					knex('lastsync')
						.update({
							tanggal_waktu : new Date(Date.now())
						})
						.then(function(lastsync){
							res.json({
						  		success : true,
						  		message : 'data sudah berhasil disync'
						  	});
						})
				  		.catch(function(err){
				  			res.json({
						  		success : true,
						  		message : 'data sudah berhasil disync, tetapi waktu gagal disinkron'
						  	});
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
	music_list_category : music_list_category,
	music_list : music_list,
	authentication : authentication,
	logout : logout,
	music_category_add : music_category_add,
	music_category_delete : music_category_delete,
	music_list_add : music_list_add,
	music_list_upload : music_list_upload,
	music_list_delete : music_list_delete,
	view : view,
	like : like,
	sync_list : sync_list,
	sync : sync
};

module.exports = handler;