const BookerReservation = require('../models/bookerReservation')
const Trip = require('../models/trip');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new booker reservation => /api/v1/bookerreservation/new
exports.newBookerReservation = catchAsyncErrors( async (req, res, next) => {

    const {
        trip,
        amountAdult,
        amountChild,
        price,
        phoneNumber,
        name
    } = req.body;

    const reservation = await BookerReservation.create({
        trip,
        amountAdult,
        amountChild,
        price,
        phoneNumber,
        name,
        booker: req.user._id
    })

    await updateNumberOfReservations(reservation.trip, reservation.amountAdult + reservation.amountChild);

    res.status(200).json({
        status:'success',
        reservation
    })

})

async function updateNumberOfReservations(id, quantity) {

    const trip = await Trip.findById(id);
    trip.numberOfReservations = trip.numberOfReservations + quantity;
    await trip.save({validateBeforeSave: false});
}

// Get booker reservations => /api/v1/booker/reservations/me
exports.getBookerReservations = catchAsyncErrors( async (req, res, next) => {

    const reservationsTemp = await BookerReservation.find({booker: req.user.id}).populate('trip');

    const reservations = reservationsTemp.filter(reservation => {
        let date = new Date(reservation.trip.date)
        return (date >= new Date(req.query.startdate) && date <= new Date(req.query.enddate))
    })

    res.status(200).json({
        success: true,
        reservations
    })
})
