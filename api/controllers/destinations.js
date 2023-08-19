const Destination = require("../models/destinations");
const Booking = require("../models/bookings");
const User = require("../models/users");

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

const bookDestination = async (req, res) => {
    try {
        let user = req.body.user._id.toString()
        let destination = (await Destination.findOne({ name: req.params.name }).exec())._id.toString()
        let booking = new Booking({
            user,
            destination,
            bookedDate: new Date(),
            checkoutDate: new Date(req.body.checkoutDate)
        })
        await booking.save()
        res.json({ message: "Booking successful" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const favouriteDestination = async (req, res) => {
    try {
        let user = req.body.user
        let destination = (await Destination.findOne({ name: req.params.name }).exec())
        if (!user.favourites) user.favourites = []
        user.favourites.push(destination)
        await user.save()
        res.json({ message: "Destination added to favourites" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllDestinations,
    getDestinationByName,
    bookDestination,
    favouriteDestination
}
