const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Please enter author name'],
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);