const mongoose = require('mongoose');

const bookerReservationSchema = mongoose.Schema({
    booker: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trip'
    },
    amountAdult: {
        type: Number,
        required: true
    },
    amountChild: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('BookerReservation', bookerReservationSchema);