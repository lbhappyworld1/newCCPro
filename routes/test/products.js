var keystone = require('keystone');
exports = module.exports = function (req, res) {
	// res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	// console.log('ddsdfsdfsdfsdf');
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		tablecolumns: {},
		students: [],
	};
	// Set locals
	locals.section = 'store';
	view.query('products', keystone.list('Product').model.find());

	view.on('init', function (next) {
		var tablecolumn = keystone.list('Columns');
		tablecolumn.model.findOne({
			slug: 'productscolumn',
		}).exec(function (err, results) {
			if (err) {
				if (err) return res.apiError('database error', err);
			}
			locals.data.tablecolumns = results;
			next(err);
		});
	});

	view.on('init', function (next) {
		var studnets = keystone.list('Students');
		var q = studnets.model.find();
		q.exec(function (err, result) {
			locals.data.students = result;
			console.log('hello2--->' + Object.prototype.toString.call(result));
			next(err);
		});
	});
	view.render('products', { layout: 'test' });
};
