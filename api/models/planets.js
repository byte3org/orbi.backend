const mongoose = require('mongoose');

const planetSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, require: true},
	description: {type: String, require: true},
	rating: {type: Number},
	destinations: {type: Number, require: true},
	galaxy: {type: String, require: true}
})

module.exports = mongoose.model("Planet", planetSchema);
