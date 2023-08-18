const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user: {type: Number, require: true},
	destination: {type: mongoose.Schema.Types.ObjectId, require: true},
	starts: {type: Number, require: true},
	comment: {type: String, require: false},
});

module.exports = mongoose.model('Review', reviewSchema);
