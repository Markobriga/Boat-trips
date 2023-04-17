const Trip = require('../models/trip');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create a new trip => /api/v1/admin/trip/new
exports.newTrip = catchAsyncErrors( async(req, res, next) => {

    const trip = await Trip.create({boat: req.body.boat, user: req.body.user, tripName:req.body.tripName, boatName:req.body.boatName, priceAdult: req.body.priceAdult, priceChild: req.body.priceChild, date: req.body.date, duration: req.body.duration, location: req.body.location.split(',').sort()});

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

// Get all trips by boat(owner) => /api/v1/owner/trips/:id
exports.getTripsByBoat = catchAsyncErrors( async(req, res, next) => {
    
    const trips = await Trip.find({user: req.params.user}).sort({date: 1})

    res.status(200).json({
        success: true,
        trips
    })
})

// Get all next trips => /api/v1/trips/next
exports.getNextTrips = catchAsyncErrors( async(req, res, next) => {

    const resPerPage = 10;

    const apiFeatures = new APIFeatures(Trip.find({ date: { $gt: new Date()}}).populate("boat"), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

    const trips = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: trips.length,
        resPerPage,
        trips
    })
})

// Get all next trips by boat => /api/v1/trips/next/:boat
exports.getNextTripsByBoat = catchAsyncErrors( async(req, res, next) => {

    const trips = await Trip.find({ boat: req.params.boat ,date: { $gt: new Date()}})

    res.status(200).json({
        success: true,
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

    if(req.body.user != trip.user) {
        return next(new ErrorHandler('Not having the permission', 403))
    }

    if(!trip) {
        return next(new ErrorHandler('No trip found', 404));
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, {boat: req.body.boat, user: req.body.user, tripName:req.body.tripName, boatName:req.body.boatName, priceAdult: req.body.priceAdult, priceChild: req.body.priceChild, date: req.body.date, duration: req.body.duration, location: req.body.location.split(',').sort()}, {
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