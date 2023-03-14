const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Reservation', reservationSchema);