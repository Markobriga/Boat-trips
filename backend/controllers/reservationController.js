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
        paymentInfo
    } = req.body;

    const reservation = await Reservation.create({
        trip,
        amountAdult,
        amountChild,
        price,
        paymentInfo,
        user: req.user._id
    })

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

    const reservations = await Reservation.find({user: req.user.id});

    res.status(200).json({
        success: true,
        reservations
    })
})

// Get all reservations => /api/v1/admin/reservations
exports.getAllReservations = catchAsyncErrors( async (req, res, next) => {

    const reservations = await Reservation.find();

    let totalPrice = 0;
    reservations.forEach(reservation => {
        totalPrice += reservation.price;
    })

    res.status(200).json({
        success: true,
        totalPrice,
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
