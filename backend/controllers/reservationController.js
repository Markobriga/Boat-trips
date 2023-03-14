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