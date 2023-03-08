const Boat = require('../models/boat')

// Create a new boat  =>  /api/v1/boat/new
exports.newBoat = async (req, res, next) => {
    
    const boat = await Boat.create(req.body)

    res.status(201).json({
        success: true,
        boat
    })
}


exports.getBoats = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'This route will show all products in database.'
    })
}