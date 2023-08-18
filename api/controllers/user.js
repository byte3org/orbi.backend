const User = require("../models/users")

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

module.exports = { getUserByName }