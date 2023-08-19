const User = require("../models/users")
const Booking = require("../models/bookings")

const getUserByName = async (req, res) => {
    try {
        let name = req.params.name
        let user = await User.findOne({ name }).exec()
        console.log(user)
        if (!user) return res.status(404).json({ 'message': 'User not found' })
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBookings = async (req, res) => {
    try {
        let isActive = req.query.active == "true"
        let user = await User.find({ name: req.params.name }).exec()
        let condition = { user }
        if (isActive) condition.checkoutDate = { $gt: new Date() }
        let bookings = await Booking.find(condition).populate('destination').exec()
        res.json(bookings)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getFavourites = async (req, res) => {
    try {
        let user = await User.find({ name: req.params.name }).exec()
        let favourites = user.favourites || []
        console.log("favourites", favourites)
        res.json(favourites)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getUserByName, getBookings, getFavourites }