const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
	destination: {type: mongoose.Schema.Types.ObjectId, ref: "Destination", require: true},
	date: {type: Date, require: true},
	comment: {type: String, require: false},
});

module.exports = mongoose.model('Review', reviewSchema);
