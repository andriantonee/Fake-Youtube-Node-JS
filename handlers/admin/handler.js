var variabel_home = {
	header : {
		sidebar : {
			"index.html" : "active"
		}
	}
};

home = function(req, res){
	res.render('./admin/home/home.html', {variabel_home : variabel_home});
};

handler = {
	home: home
};

module.exports = handler;