const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
	destination: {type: mongoose.Schema.Types.ObjectId, ref: 'Destination', require: true},
	bookedDate: {type: Date, require: true},
	checkoutDate: {type: Date, require: true}
});

module.exports = mongoose.model('Booking', bookingSchema);
