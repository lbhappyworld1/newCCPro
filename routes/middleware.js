/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: '首页', key: 'home', href: '/' },
		{ label: '个人微博', key: 'blog', href: '/blog' },
		{ label: '相册', key: 'gallery', href: '/gallery' },
		{ label: '联系方式', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};

exports.is


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		// req.flash('error', 'Please sign in to access this page.');
		// res.redirect('/keystone/signin');
		next();
	} else {
		console.log('user--->' + req.user);
		if (req.user && req.user.isAdmin) {
			res.locals.navLinks.push({ label: '学生', key: 'store', href: '/products' });
		}
		next();
	}
};

exports.isAdmin = function (req, res, next) {
	if (!req.user) {
		// req.flash('error', 'Please sign in to access this page.');
		// req.redirect('/signin');
		next();
	} else if (!req.user.isAdmin) {
		req.flash('error', 'User does not belong to admin group.');
		req.redirect('/');
	} else {
		next();
	}
};


exports.mecors = function (req, res, next) {
	// console.log('ddddddddddddddd');
	// res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
	// res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
};

exports.jsonTest = function (req, res) {
	return res.apiResponse({
		success: true,
	});
};

