const Reservation = require('../models/reservation');
const Trip = require('../models/trip');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new reservation => /api/v1/reservation/new
exports.newReservation = catchAsyncErrors( async (req, res, next) => {

    const {
        trip,
        amountAdult,
        amountChild,
        price,
        paymentInfo,
        phoneNumber,
    } = req.body;

    const reservation = await Reservation.create({
        trip,
        amountAdult,
        amountChild,
        price,
        paymentInfo,
        phoneNumber,
        user: req.user._id
    })

    await updateNumberOfReservations(reservation.trip, reservation.amountAdult + reservation.amountChild);

    res.status(200).json({
        status:'success',
        reservation
    })

})

// Get single reservation => /api/v1/reservation/:id
exports.getSingleReservation = catchAsyncErrors( async (req, res, next) => {

    const reservation = await Reservation.findById(req.params.id).populate('user', 'name email');

    if(!reservation) {
        return next(new ErrorHandler('Reservation not found', 404));
    }

    res.status(200).json({
        success: true,
        reservation
    })
})

// Get logged in user reservation => /api/v1/reservations/me
exports.getMyReservations = catchAsyncErrors( async (req, res, next) => {

    const reservations = await Reservation.find({user: req.user.id}).populate('trip');

    res.status(200).json({
        success: true,
        reservations
    })
})

// Get all reservations (trip) => /api/v1/owner/trip/reservations/:id
exports.getAllReservations = catchAsyncErrors( async (req, res, next) => {

    const reservations = await Reservation.find({trip: req.params.id}).populate('user');

    res.status(200).json({
        success: true,
        reservations
    })
})

// Process reservation => /api/v1/admin/reservation/:id
exports.processReservation = catchAsyncErrors( async (req, res, next) => {

    const reservation = await Reservation.findById(req.params.id);

    if(!reservation) {
        return next(new ErrorHandler('Reservation not found', 404));
    }

    await updateNumberOfReservations(reservation.trip, reservation.amountAdult+reservation.amountChild);

    res.status(200).json({
        success: true
    })
})

async function updateNumberOfReservations(id, quantity) {

    const trip = await Trip.findById(id);
    trip.numberOfReservations = trip.numberOfReservations + quantity;
    await trip.save({validateBeforeSave: false});
}

// Delete reservation => /api/v1/admin/reservation/:id
exports.deleteReservation = catchAsyncErrors( async (req, res, next) => {

    let reservation = await Reservation.findById(req.params.id);

    if(!reservation) {
        return next(new ErrorHandler('Reservation not found', 404));
    }

    await updateNumberOfReservations(reservation.trip, -(reservation.amountAdult+reservation.amountChild));

    reservation = await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true
    })
})
