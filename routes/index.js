/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.requireUser);
// keystone.pre('render', middleware.mecors);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	test: importRoutes('./test'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/products', [keystone.middleware.cors, routes.test.products]);
	// app.get('/products', [keystone.middleware.cors]);
	// app.get('/api/stuff', [keystone.middleware.api, keystone.middleware.cors], routes.api.workshop.getStuff);
	app.get('/products/:product', routes.views.product);
	app.get('/gallery', routes.views.gallery);
	app.get('/uikit',routes.views.uikit)
	app.all('/contact', routes.views.contact);
	app.all('/products*', keystone.middleware.cors);
	// 返回json格式
	app.get('/api/getStudents', keystone.middleware.api, routes.api.test.getStudents);
	app.get('/api/getStudentsByCardid', keystone.middleware.api, routes.api.test.getStudentByCardId);
	app.get('/api/searchStudents', keystone.middleware.api, routes.api.test.searchStudents);
	app.post('/api/upLoadFile', keystone.middleware.api, routes.api.test.upLoadFile);
	
	app.post('/api/updateStudent', keystone.middleware.api, routes.api.test.updateStudent);
	app.post('/api/saveStudents', keystone.middleware.api, routes.api.test.saveStudents);
	app.post('/api/deleteStudents', keystone.middleware.api, routes.api.test.deleteStudents);
	app.get('/api/isUser',keystone.middleware.api,routes.api.test.isUser);
	app.options('/products*', function (req, res) {
		res.sendStatus(200);
	});
	// app.all('/api*', keystone.middleware.cors);
	// app.options('/api*', function (req, res) {
	// 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN');
	// 	res.sendStatus(200);
	// });
	// app.all('/products', keystone.middleware.cors, routes.api.events);
	// app.all('/products', keystone.middleware.cors);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
