const Destination = require("../models/destinations");
const Booking = require("../models/bookings");
const Review = require("../models/reviews");

const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDestinationByName = async (req, res) => {
    try {
        let name = req.params.name.toLowerCase();
        const destination = await Destination.findOne({ name }).exec();
        if (!destination) return res.status(404).json({ message: "Destination not found" });
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const _inPeriod = (date, from, to) => {
    return from < date && date < to
}

const getTrendingDestinations = async (req, res) => {

    let day = 24 * 60 * 60 * 1000
    let now = new Date()
    let currentTime = now.getTime()
    let today = new Date(currentTime - 1 * day)
    let yesterday = new Date(currentTime - 2 * day)
    let thisWeek = new Date(currentTime - 7 * day)
    let lastWeek = new Date(currentTime - 14 * day)
    let thisMonth = new Date(currentTime - 30 * day)
    let lastMonth = new Date(currentTime - 60 * day)

    try {
        let t = parseInt(req.query.t);
        if (!t) t = 7
        if (t != 1 && t != 7 && t != 30) return res.status(400).json({ message: "Invalid time period" })
        let bookings = await Booking.find({
            bookedDate: {
                $gte: lastMonth
            }
        }).exec()
        let scoring = []

        bookings.forEach(booking => {
            let destination = booking.destination
            let bookedDate = booking.bookedDate
            if (!scoring[destination]) scoring[destination] = 0
            if (t == 1) {
                scoring[destination] += _inPeriod(bookedDate, today, now) * 2
                    + _inPeriod(bookedDate, yesterday, today) * 0.5
                    + _inPeriod(bookedDate, thisWeek, now) * 0.2
                    + _inPeriod(bookedDate, thisMonth, now) * 0.1
            } else if (t == 7) {
                scoring[destination] += _inPeriod(bookedDate, thisWeek, now) * 2
                    + _inPeriod(bookedDate, lastWeek, thisWeek) * 0.5
                    + _inPeriod(bookedDate, thisMonth, now) * 0.1
            } else if (t == 30) {
                scoring[destination] += _inPeriod(bookedDate, thisMonth, now) * 2
                    + _inPeriod(bookedDate, lastMonth, thisMonth) * 0.5
            }
        })

        let trending = (await Destination.find()).sort((e1, e2) => {
            return (scoring[e2._id] || 0) - (scoring[e1._id] || 0)
        })
        res.json(trending)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addReview = async (req, res) => {
    try {
        let user = req.body.user._id.toString()
        let destination = (await Destination.findOne({ name: req.params.name }).exec())._id.toString()
        let review = new Review({
            user,
            destination,
            date: new Date(),
            comment: req.body.comment
        })
        await review.save()
        res.json({ message: "Review added" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getReviews = async (req, res) => {
    try {
        let name = req.params.name.toLowerCase();
        let destination = await Destination.findOne({ name }).exec()
        let reviews = await Review.find({ destination }).populate("user").exec()
        res.json(reviews)
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
    getTrendingDestinations,
    bookDestination,
    favouriteDestination,
    addReview,
    getReviews
}
