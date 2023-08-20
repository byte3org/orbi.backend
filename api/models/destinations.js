const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	id: {type: String, require: true},
	name: {type: String, require: true},
	planet: {type: mongoose.Schema.Types.ObjectId, ref: 'Planet'},
	ratings: {type: Number},
});

module.exports = mongoose.model('Destination', destinationSchema);
