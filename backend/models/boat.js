const mongoose = require('mongoose')

const  boatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter boat name'],
        trim: true,
        maxLength: [100, 'Boat name cannot be longer than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter boat description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    start: {
        type: String,
        required: [true, 'Please enter starting location'],
        trim: true,
        maxLength: [100, 'Starting location cannot be longer than 100 characters']
    },
    locations: [
        {
            type: String,
            required: [true, 'Please enter visiting islands'],
        }
    ],
    maxNumberOfReservations: {
        type: Number,
        required: [true, 'Please enter max number of reservations'],
        maxLength: [5, 'Max number of reservations cannot exceed 5 characters'],
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            /*user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },*/
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    /*user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },*/
    owner: {
        type: String,
        required: [true, 'Please enter owner name'],
    }
})

module.exports = mongoose.model('Boat', boatSchema);