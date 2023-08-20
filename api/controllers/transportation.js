const {publicTransportation} = require('../models/transport')
const {privateTransportation} = require('../models/transportmodule.exports = mongoose.model("Transportion", transportationSchema)')

const getAllPrivateTransportation = async (req, res) => {
    try {
        const transportation = await privateTransportation.find();
        res.json(transportation);
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllPublicTransportForDestination = async (req, res) => {
    try {
        let destination = req.params.destination.toLowerCase()
        let transportation = await publicTransportation.find({ id: destination }).exec()
        if (!) return res.status(404).json({ 'message': 'Planet not found' })
        res.json(planet)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
