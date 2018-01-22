var keystone = require('keystone');
var Studnets = keystone.list('Students');
exports.getStudents = function (req, res) {
	Studnets.model.find(function (err, items) {
		if (err) return res.apiError('database error', err);
		res.apiResponse({
			students: items,
		});
	});
};

exports.getStudentByCardId = function (req, res) {
	console.log(req.query);
	console.log(req.query.studentid);
	var p = Studnets.model.find().where('cardid', req.query.studentid);
	p.exec(function (err, item) {
		console.log('enter....');
		if (err) return res.apiError('database error', err);
		if (!item | item.length === 0) return res.apiError('not found');
		res.apiResponse({
			student: item,
		});
	});
};


exports.updateStudent = function (req, res) {
	console.log(req.query.studentid);
	console.log(req.body);
	console.log('enter updateStudent....');
	//
	// var p = Studnets.model.find().where('cardid', req.body.cardid);
	// p.remove(function (err) {
	// 	if (err) return res.apiError('updateStudent database remove error', err);
	// });
	var data = req.body;
	// console.log(data.studentname);
	// var newPost = new Studnets.model(data);
	// newPost.save(function (err) {
	// 	if (err) return res.apiError('updateStudent database save error', err);
	// });
	// Studnets.model.find().where('cardid', req.body.cardid).update(data).exec(function (err, item) {
	// 	console.log('enter....');
	// 	if (err) return res.apiError('database error', err);
	// })

	var p = Studnets.model.find().where('cardid', req.body.cardid);
	p.remove(function (err) {
		if (err) return res.apiError('updateStudent database remove error', err);
	});
	var newPost = new Studnets.model(data);
	newPost.save(function (err) {
		if (err) return res.apiError('updateStudent database save error', err);
	});

	res.apiResponse({
		sucdess: 'YES',
	});
};

exports.saveStudents = function (req, res) {
	var data = req.body;
	console.log(req.body);
	if (!data) {
		console.log('center');
	}
	var students = req.body.students;
	if (!students) {
		return res.apiError('students is null error', { error: 'students is null' });
	}
	if (Object.prototype.toString.call(students) === '[object Array]' | students.length !== 0) {
		for (var i = 0; i < students.length; i++) {
			var student = students[i];
			console.log('enter....' + student.cardid);
			// Studnets.model.find().where('cardid', student.cardid).findOneAndUpdate().exec(function (err, item) {
			// 	console.log('enter....' + item);
			// 	if (!item) {
			// 		console.log('saveitem....' + student.cardid);
			// 		var newPost = new Studnets.model(student);
			// 		newPost.save(function (err) {
			// 			if (err) return res.apiError('updateStudent database save error', err);
			// 		});
			// 	};
			// });
			var p = Studnets.model.find().where('cardid', student.cardid).update(student);
			p.remove(function (err) {
				if (err) return res.apiError('updateStudent database remove error', err);
			});
			var newPost = new Studnets.model(student);
			newPost.save(function (err) {
				if (err) return res.apiError('updateStudent database save error', err);
			});
		}
	} else {
		return res.apiError('req.body.students is not array', { error: 'req.body.students is not array' });
	}
	res.apiResponse({
		sucdess: 'YES',
	});
};
exports.searchStudents = function (req, res) {
	console.log(req.query.searchkey);
	var studentname = req.query.searchkey;
	var batch = req.query.batch;
	var patrn = new RegExp(studentname, 'i');
	var batchn = new RegExp(batch, 'i');
	Studnets.model.find({ studentname: patrn, batch: batchn }, null, function (err, docs) {
		if (err) {
			res.apiError('updateStudents database save error', err);
		}
		res.apiResponse({
			student: docs,
		});
	});
};

exports.deleteStudents = function (req, res) {
	var students = req.body.students;
	if (!students) {
		return res.apiError('students is null error', { error: 'students is null' });
	}
	if (Object.prototype.toString.call(students) === '[object Array]' | students.length !== 0) {
		for (var i = 0; i < students.length; i++) {
			var student = students[i];
			console.log('enter....' + student.cardid);
			var p = Studnets.model.find().where('cardid', student.cardid).update(student);
			p.remove(function (err) {
				if (err) return res.apiError('updateStudent database remove error', err);
			});
		}
	} else {
		return res.apiError('req.body.students is not array', { error: 'req.body.students is not array' });
	}
	res.apiResponse({
		sucdess: 'YES',
	});
};


