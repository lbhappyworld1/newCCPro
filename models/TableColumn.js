var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Columns = new keystone.List('Columns', {
	map: { name: 'title' },
	singular: 'tableColumn',
	plural: 'tableColumns',
	autokey: { path: 'slug', from: 'title', unique: true },
});

Columns.add({
	title: { type: String, required: true },
	content: { type: Types.Code, wysiwyg: true, height: 300 },
	publishedDate: { type: Date, default: Date.now },
});
Columns.register();
