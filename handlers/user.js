var active_navbar = function(){
		var obj = {
			"home" : "",
			"music_category" : "",
			"popular_on_web" : "",
			"about_us" : ""
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
	async = require('async');

home = function(req, res){
	var home = {
		active_navbar : active_navbar()
	};

	home.active_navbar.home = "class=active";

	res.render('./user/pages/home/home.html', {home : home});
};

music_category = function(req, res){
	var music_category = {
		active_navbar : active_navbar(),
		tab_content_music_category : []
	};

	music_category.active_navbar.music_category = "class=active";

	knex.select('category')
		.table('music_category')
		.orderBy('tanggal_waktu')
		.then(function(rows){
			music_category.tab_content_music_category = rows;
			for (i = 0; i < music_category.tab_content_music_category.length; i++){
				if (i === 0){
					music_category.tab_content_music_category[i].class = "active";
				}
				else{
					music_category.tab_content_music_category[i].class = "";
				}
			};

			var asyncTasks = [];

			music_category.tab_content_music_category.forEach(function(item){
				asyncTasks.push(function(callback){
					knex.select()
						.table('music_list')
						.where({
							music_category : item.category
						})
						.orderBy('tanggal_waktu')
						.then(function(rows){
							item.list = rows;
							callback();
						})
						.catch(function(err){
							item.list = [];
							callback();
						})
				});
			});
			async.parallel(asyncTasks, function(){
			  	res.render('./user/pages/music_category/music_category.html', {music_category : music_category});
			});
		})
		.catch(function(err){
			res.render('./user/pages/music_category/music_category.html', {music_category : music_category});
		});
};

popular_on_web = function(req, res){
	var popular_on_web = {
		active_navbar : active_navbar(),
		body_content_popular_on_web : []
	};

	popular_on_web.active_navbar.popular_on_web = "class=active";

	knex.select()
		.table('music_list')
		.orderBy('tanggal_waktu')
		.limit(12)
		.then(function(rows){
			popular_on_web.body_content_popular_on_web = rows;
			
			res.render('./user/pages/popular_on_web/popular_on_web.html', {popular_on_web : popular_on_web});
		})
		.catch(function(err){
			console.log(err);
			res.render('./user/pages/popular_on_web/popular_on_web.html', {popular_on_web : popular_on_web});
		});
};

about_us = function(req, res){
	var about_us = {
		active_navbar : active_navbar()
	};

	about_us.active_navbar.about_us = "class=active";

	res.render('./user/pages/about_us/about_us.html', {about_us : about_us});
};

play = function(req, res){
	var play = {
		active_navbar : active_navbar(),
		music_list : [],
		suggestion_content : []
	};

	knex.select()
		.table('music_list')
		.where({
			music_title : req.params["music_title"],
			music_singer : req.params["music_singer"]
		})
		.then(function(rows){
			if (rows.length !== 0){
				play.music_list = rows;
				
				knex('music_list_view')
					.insert({
						music_title : req.params["music_title"],
						music_singer : req.params["music_singer"],
						tanggal_waktu : new Date(Date.now())
					})
					.then(function(music_list_view){
						knex.select()
							.table('music_list')
							.where({
								music_category : play.music_list[0].music_category
							})
							.whereNot(function(){
								this.where({
									music_title : req.params["music_title"],
									music_singer : req.params["music_singer"]
								});
							})
							.orderBy('tanggal_waktu', 'desc')
							.limit(8)
							.then(function(rows){
								play.suggestion_content = rows;

								res.render('./user/pages/play/play.html', {play : play});
							})
							.catch(function(rows){
								res.status(404)
									.end();
							})
					})
					.catch(function(err){
						res.status(404)
							.end();
					});
			}
			else{
				res.status(404)
					.end();
			}
		})
		.catch(function(err){
			res.status(404)
				.end();
		});
};

like = function(req, res){
	if (req.body.music_title && req.body.music_singer){
		knex('music_list_like')
			.insert({
				music_title : req.body.music_title,
				music_singer : req.body.music_singer,
				tanggal_waktu : new Date(Date.now())
			})
			.then(function(music_list_like){
				res.json({
					success : true,
					message : 'Like berhasil bertambah'
				})
			})
			.catch(function(err){
				res.json({
					success : false,
					message : 'Like tidak berhasil bertambah'
				})
			});
	}
	else{
		res.json({
			success : false,
			message : 'Like tidak berhasil bertambah'
		})
	}
};

handler = {
	home : home,
	music_category : music_category,
	popular_on_web : popular_on_web,
	about_us : about_us,
	play : play,
	like : like
};

module.exports = handler;