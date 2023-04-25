const Post = require('../models/post');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary')

// Create a new post => /api/v1/admin/post/new
exports.newPost = catchAsyncErrors( async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];
    
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'posts'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    const post = await Post.create({title: req.body.title, author: req.body.author, content: req.body.content, images: req.body.images, tags: req.body.tags.split(',')})

    res.status(201).json({
        success: true,
        post
    })

})

// Get all posts => /api/v1/posts
exports.getPosts = catchAsyncErrors( async (req, res, next) => {

    const posts = await Post.find()

    res.status(200).json({
        success: true,
        posts
    })
})

// Get a single post => /api/v1/post/:id
exports.getSinglePost = catchAsyncErrors( async(req, res, next) => {

    const post = await Post.findById(req.params.id);

    if(!post) {
        return next(new ErrorHandler('Post not found', 404));
    }
    res.status(200).json({
        success: true,
        post
    })
})

// Update a post => /api/v1/admin/post/:id
exports.updatePost = catchAsyncErrors( async(req, res, next) => {

    let post = await Post.findById(req.params.id)

    if(!post) {
        return next(new ErrorHandler('Post not found', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the post
        for (let i = 0; i < post.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(post.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'posts'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }

    post = await Post.findByIdAndUpdate(req.params.id, {title: req.body.title, author: req.body.author, content: req.body.content, images: req.body.images, tags: req.body.tags.split(',')}, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        post
    })
})

// Delete a post => /api/v1/admin/post/:id
exports.deletePost = catchAsyncErrors( async(req, res, next) => {

    let post = await Post.findById(req.params.id)

    if(!post) {
        return next(new ErrorHandler('Post not found', 404));
    }

    post = await Post.findByIdAndRemove(req.params.id)

    res.status(200).json({
        success: true,
        post
    })
})