const Planet = require('../models/planets');

const getAllPlanets = async (req, res) => {
    try {
        const planets = await Planet.find();
        console.log(planets)
        res.json(planets);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getPlanetByName = async (req, res) => {
    try {
        let name = req.params.name.toLowerCase()
        let planet = await Planet.findOne({ name }).exec()
        console.log(planet)
        if (!planet) return res.status(404).json({ 'message': 'Planet not found' })
        res.json(planet)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllPlanets,
    getPlanetByName
}