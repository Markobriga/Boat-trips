const Boat = require('../models/boat')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new boat => /api/v1/admin/boat/new
exports.newBoat = catchAsyncErrors( async (req, res, next) => {

    const boat = await Boat.create(req.body)

    res.status(201).json({
        success: true,
        boat
    })
})

// Get all boats => /api/v1/boats
exports.getBoats = catchAsyncErrors( async(req, res, next) => {

    const boats = await Boat.find();
    res.status(200).json({
        success: true,
        count: boats.length,
        boats
    })
})

// Get single boat details => /api/v1/boat/:id
exports.getSingleBoat = catchAsyncErrors( async(req, res, next) => {

    const boat = await Boat.findById(req.params.id);

    if(!boat) {
        return next(new ErrorHandler('Boat not found', 404));
    }
    res.status(200).json({
        success: true,
        boat
    })
})

// Update a boat => /api/v1/admin/boat/:id
exports.updateBoat = catchAsyncErrors( async(req, res, next) => {

    let boat = await Boat.findById(req.params.id)

    if(!boat) {
        return next(new ErrorHandler('Boat not found', 404));
    }

    boat = await Boat.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        boat
    })
})

// Delete a boat => /api/v1/admin/boat/:id
exports.deleteBoat = catchAsyncErrors( async(req, res, next) => {

    let boat = await Boat.findById(req.params.id)

    if(!boat) {
        return next(new ErrorHandler('Boat not found', 404));
    }

    boat = await Boat.findByIdAndRemove(req.params.id)

    res.status(200).json({
        success: true,
        boat
    })
})