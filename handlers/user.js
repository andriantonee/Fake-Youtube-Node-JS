home = function(req, res){
	res.render('./user/home/home.html', {});
};

handler = {
	home: home,
};

module.exports = handler;