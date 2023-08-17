const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, require: true},
	planet: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
	ratings: {type: Number},
});

module.exports = mongoose.model('Destination', destinationSchema);