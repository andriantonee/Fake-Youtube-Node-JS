var knex = require('knex')({
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'knexuser',
			password : '12345',
			database : 'knextest'
		}
	});

home = function(req, res){
	res.render('./user/pages/home/home.html', {});
};

music_category = function(req, res){
	var music_category = {
		tab_content_music_category : []
	};

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
			
			res.render('./user/pages/music_category/music_category.html', {music_category : music_category});
		})
		.catch(function(err){
			res.render('./user/pages/music_category/music_category.html', {music_category : music_category});
		});
};

handler = {
	home: home,
	music_category : music_category
};

module.exports = handler;