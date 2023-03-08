const Boat = require('../models/boat')

// Create a new boat => /api/v1/boat/new
exports.newBoat = async (req, res, next) => {

    const boat = await Boat.create(req.body)

    res.status(201).json({
        success: true,
        boat
    })
}

// Get all boats => /api/v1/boats
exports.getBoats = async(req, res, next) => {

    const boats = await Boat.find();
    res.status(200).json({
        success: true,
        count: boats.length,
        boats
    })
}

// Get single boat details => /api/v1/boat/:id
exports.getSingleBoat = async(req, res, next) => {

    const boat = await Boat.findById(req.params.id);

    if(!boat) {
        return res.status(404).json({
            success: false,
            message: 'Boat not found'
        })
    }
    res.status(200).json({
        success: true,
        boat
    })
}