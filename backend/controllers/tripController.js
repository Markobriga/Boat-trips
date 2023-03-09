const Trip = require('../models/trip');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create a new trip => /api/v1/admin/trip/new
exports.newTrip = catchAsyncErrors( async(req, res, next) => {

    const trip = await Trip.create(req.body)

    res.status(201).json({
        status:'success',
        data: trip
    })
})