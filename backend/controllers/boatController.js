const Boat = require('../models/boat')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const { isValidObjectId } = require('mongoose');
const cloudinary = require('cloudinary')

// Create a new boat => /api/v1/admin/boat/new
exports.newBoat = catchAsyncErrors( async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'boats'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    const boat = await Boat.create({name: req.body.name, images: req.body.images, description:req.body.description, start:req.body.start, maxNumberOfReservations:req.body.maxNumberOfReservations, owner:req.body.owner, user:req.body.user, locations: req.body.locations.split(',').sort()})

    res.status(201).json({
        success: true,
        boat
    })
})

// Get all boats => /api/v1/boats?keyword=brod
exports.getBoats = catchAsyncErrors( async(req, res, next) => {

    const apiFeatures = new APIFeatures(Boat.find(), req.query).search()

    const boats = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: boats.length,
        boats
    })
})

// Get single boat details => /api/v1/boat/:id
exports.getSingleBoat = catchAsyncErrors( async(req, res, next) => {

    const boat = await Boat.findById(req.params.id);

    if(!boat) {
        return next(new ErrorHandler('Boat not found', 404));
    }
    res.status(200).json({
        success: true,
        boat
    })
})

// Get boat by owner id => /api/v1/admin/boat/:id
exports.getBoatByOwner = catchAsyncErrors( async(req, res, next) => {

    const boat = await Boat.findOne({user: req.params.id})

    res.status(200).json({
        success: true,
        boat
    })
})

// Update a boat => /api/v1/admin/boat/:id
exports.updateBoat = catchAsyncErrors( async(req, res, next) => {

    let boat = await Boat.findById(req.params.id)

    if(boat.user != req.body.user) {
        return next(new ErrorHandler('Not having the permission', 403))
    }

    if(!boat) {
        return next(new ErrorHandler('Boat not found', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the boat
        for (let i = 0; i < boat.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(boat.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'boats'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }

    boat = await Boat.findByIdAndUpdate(req.params.id, {name: req.body.name, images: req.body.images, description:req.body.description, start:req.body.start, maxNumberOfReservations:req.body.maxNumberOfReservations, owner:req.body.owner, user:req.body.user, locations: req.body.locations.split(',').sort()}, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        boat
    })
})

// Delete a boat => /api/v1/admin/boat/:id
exports.deleteBoat = catchAsyncErrors( async(req, res, next) => {

    let boat = await Boat.findById(req.params.id)

    if(!boat) {
        return next(new ErrorHandler('Boat not found', 404));
    }

    boat = await Boat.findByIdAndRemove(req.params.id)

    res.status(200).json({
        success: true,
        boat
    })
})

// Create new review => /api/v1/review
exports.createReview = catchAsyncErrors( async(req, res, next) => {

    const { rating, comment, boatId } = req.body;
    
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const boat = await Boat.findById(boatId);

    const isReviewed = boat.reviews.find(
        review => review.user.toString() === req.user._id.toString()
    )

    if(isReviewed) {
        boat.reviews.forEach(review =>{
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
        
    } else {
        boat.reviews.push(review);
        boat.numOfReviews = boat.reviews.length;
    }

    boat.ratings = boat.reviews.reduce((acc, item) => item.rating + acc, 0) / boat.reviews.length;

    await boat.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        boat
    })
})

// Get boat reviews => /api/v1/reviews
exports.getReviews = catchAsyncErrors( async(req, res, next) => {

    const boat = await Boat.findById(req.query.id);

    if(!boat) {
        return next(new ErrorHandler('Boat not found', 404));
    }

    res.status(200).json({
        success: true,
        reviews: boat.reviews
    })
})

// Delete boat review => /api/v1/reviews
exports.deleteReview = catchAsyncErrors( async(req, res, next) => {

    const boat = await Boat.findById(req.query.boatId);

    const reviews = boat.reviews.filter(r => r._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = boat.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Boat.findByIdAndUpdate(req.query.boatId, {
        reviews,
        numOfReviews,
        ratings
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})