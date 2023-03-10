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

// Get all trips => /api/v1/trips
exports.getTrips = catchAsyncErrors( async(req, res, next) => {

    const resPerPage = 4;
    const tripCount = await Trip.countDocuments();

    const apiFeatures = new APIFeatures(Trip.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

    const trips = await apiFeatures.query;

    res.status(200).json({
        status:'success',
        count: trips.length,
        tripCount,
        trips
    })
})


// Get a single trip => /api/v1/trip/:id
exports.getSingleTrip = catchAsyncErrors( async(req, res, next) => {

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
        return next(new ErrorHandler('No trip found', 404));
    }
    res.status(200).json({
        status:'success',
        trip
    })
})

// Update a trip => /api/v1/admin/trip/:id
exports.updateTrip = catchAsyncErrors( async(req, res, next) => {

    let trip = await Trip.findById(req.params.id)

    if(!trip) {
        return next(new ErrorHandler('No trip found', 404));
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        status:'success',
        trip
    })
})

// Delete a trip => /api/v1/admin/trip/:id
exports.deleteTrip = catchAsyncErrors( async(req, res, next) => {

    let trip = await Trip.findById(req.params.id)

    if(!trip) {
        return next(new ErrorHandler('No trip found', 404));
    }

    trip = await Trip.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status:'success',
        trip
    })
})