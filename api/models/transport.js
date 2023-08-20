const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

const transportationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {type: String, require: true},
	name: {type: String, require: true},
	description: {type: String, require: true},
	mode: {type: String, require: true},
    unit_price: {type: Number, rquire: true},
})

const privateTransportationSchema = extendSchema(transportationSchema, {
    departure: {type: String, require: true},
    arrival: {type: String, require: true},
})

const privateTransportation = mongoose.model("PrivateTransportation", privateTransportationSchema)

const publicTransportationSchema = extendSchema(transportationSchema, {
    departure: {type: Date, require: true},
    arrival: {type: Date, require: true},
    destination: {type: mongoose.Schema.Types.ObjectId, ref: "Destination", require: true},
})

const publicTransportation = mongoose.model("PublicTransportation", publicTransportationSchema)

module.exports = {
    publicTransportation: publicTransportation,
    privateTransportation: privateTransportation,
}
