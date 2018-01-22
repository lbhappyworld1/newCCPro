var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Columns = new keystone.List('Students', {
	map: { name: 'title' },
	singular: 'student',
	plural: 'student',
	autokey: { path: 'slug', from: 'title', unique: true },
});

Columns.add({
	title: { type: String, required: true },
	cardid: { type: String, default: '' },
	studentname: { type: String, default: '' },
	batch: { type: String, default: '' },
	education: { type: String, default: '' },
	toolstandard: { type: String, default: '' },
	tuition: { type: String, default: '' },
	channel: { type: String, default: '' },
	channeltotle: { type: String, default: '' },
	returnchannel: { type: String, default: '' },
	backchannel: { type: String, default: '' },
	debit: { type: String, default: '' },
	favoura: { type: String, default: '' },
	paidtuition: { type: String, default: '' },
	regfee: { type: String, default: '' },
	totelall: { type: String, default: '' },
	channelratio: { type: String, default: '' },
	arrears: { type: String, default: '' },
	remark: { type: String, default: '' },
	createDate: { type: Date, default: Date.now },
});
Columns.register();
