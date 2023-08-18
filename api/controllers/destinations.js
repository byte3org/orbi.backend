const Destination = require("../models/destinations");

const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        console.log(destinations);
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDestinationByName = async (req, res) => {
    try {
        let name = req.params.name.toLowerCase();
        const destination = await Destination.findOne({ name }).exec();
        console.log(destination);
        if (!destination) return res.status(404).json({ message: "Destination not found" });
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllDestinations,
    getDestinationByName
}
