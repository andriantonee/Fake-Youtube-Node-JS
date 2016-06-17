var admin = require('./admin'),
	user = require('./user'),
	handlers;

handlers = {
	admin : admin,
	user : user
}

module.exports = handlers