const mongoose = require('mongoose');

const planetSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	id: {type: String, require: true},
	name: {type: String, require: true},
	description: {type: String, require: true},
	rating: {type: Number, default: 0},
	galaxy: {type: String, require: true},
    distance: {type: Number, rquire: true}
})

module.exports = mongoose.model("Planet", planetSchema);
