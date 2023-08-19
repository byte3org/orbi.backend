const mongoose = require('mongoose');
const Destination = require('./destinations')

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, require: true},
	favourites: {type: [Destination.schema], default: []},
})

module.exports = mongoose.model("User", userSchema);
