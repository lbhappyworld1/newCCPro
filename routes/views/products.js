var keystone = require('keystone');
exports = module.exports = function (req, res) {
	// res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Set locals
	locals.section = 'store';
	view.query('products', keystone.list('Product').model.find());
	view.render('products');
};
