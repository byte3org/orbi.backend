const {publicTransportation, privateTransportation} = require('../models/transport')
const Destination = require('../models/destinations')

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
        let destId = await Destination.find({ id: destination }).exec()
        let transportation = await publicTransportation.find({ destination: destId }).exec()
        console.log(transportation)
        ///if (!) return res.status(404).json({ 'message': 'Planet not found' })
        res.json(transportation)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllPrivateTransportation,
    getAllPublicTransportForDestination
}