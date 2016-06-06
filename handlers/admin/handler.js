home = function(req, res){
	res.render('./admin/index.html', {});
};

handler = {
	home: home
};

module.exports = handler;