var variabel_home = {
		header : {
			sidebar : {
				"index.html" : "active"
			}
		},

	};

var variabel_login = {

	};

/* Knex */
// var knex = require('knex')({
// 		client: 'mysql',
// 		connection: {
// 			host     : '127.0.0.1',
// 			user     : 'knexuser',
// 			password : '12345',
// 			database : 'knextest'
// 		}
// 	}),

/* Harus menggunakan metode post di bagian router */
// knex('test').insert({nama: 'asdd'});

login = function(req, res){
	res.render('./admin/pages/login/login.html', {variabel_login : variabel_login});
};

home = function(req, res){
	res.render('./admin/pages/home/home.html', {variabel_home : variabel_home});
};

handler = {
	login: login,
	home: home
};

module.exports = handler;