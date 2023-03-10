const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors( async( req,res,next ) => {

    const {name, email, password} = req.body;
    
    const user = await User.create({
        name,
        email,
        password
    });

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
})

// Login a user => /api/v1/login
exports.loginUser = catchAsyncErrors( async( req,res,next ) => {
    const {email, password} = req.body;

    // Check if email and password are entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email and password',400));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password',401));
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        return next(new ErrorHandler('Invalid email or password',401));
    }

    const token = user.getJwtToken();
    res.status(200).json({
        success: true,
        token
    })
})