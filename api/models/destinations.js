const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	id: {type: String, require: true},
	name: {type: String, require: true},
	description: {type: String, require: true},
	planet: {type: mongoose.Schema.Types.ObjectId, ref: 'Planet'},
	oxygenLevel: {type: Number, require: true},
	population: {type: Number, require: true},
	temperature: {type: Number, require: true},
	ratings: {type: Number},
});

module.exports = mongoose.model('Destination', destinationSchema);
