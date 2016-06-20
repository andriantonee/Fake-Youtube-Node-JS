home = function(req, res){
	res.render('./user/pages/home/home.html', {});
};

handler = {
	home: home,
};

module.exports = handler;