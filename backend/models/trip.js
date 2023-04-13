const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    boat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Boat',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    tripName:{
        type: String,
        required: [true, 'Please enter a trip name']
    },
    boatName: {
        type: String,
        required: true
    },
    priceAdult: {
        type: Number,
        required: [true, 'Please enter the price for adults']
    },
    priceChild: {
        type: Number,
        required: [true, 'Please enter the price for children']
    },
    location: {
            type: String,
            required: [true, 'Please enter visiting islands'],
    },
    numberOfReservations: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: [true, 'Please enter the date of the trip']
    },
    duration: {
        type: Number,
        required: [true, 'Please enter the duration of the trip in hours']
    }
});

module.exports = mongoose.model('Trip', tripSchema);