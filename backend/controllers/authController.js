const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors( async( req,res,next ) => {

    const {name, email, password, confirmPassword} = req.body;

    if(password !== confirmPassword) {
        return next(new ErrorHandler('Passwords do not match',401))
    }

    const user = await User.create({
        name,
        email,
        password
    });

    sendToken(user, 200, res);

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

    sendToken(user, 200, res);
})

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async(req,res,next) => {

    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler('Invalid email',404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });

        res.status(200).json({
            success: true,
            message: 'An email has been sent to your email'
        })

    } catch(err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }

})

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors( async (req, res, next) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    })

    if(!user) {
        return next(new ErrorHandler('Invalid token',400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password and confirm password do not match', 400));
    }

   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;
   
   await user.save();

   sendToken(user, 200, res)
})

//  Get currently logged in user => api/v1/me
exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update password => api/v1/password/update
exports.updatePassword = catchAsyncErrors( async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched) {
        return next(new ErrorHandler('Invalid old password',400));
    }
    user.password = req.body.password;
    await user.save();
    
    sendToken(user, 200, res)
})

// Update profile => api/v1/me/update
exports.updateProfile = catchAsyncErrors( async (req, res, next) => {
    
    const newUser = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })
})

// Logout a user => /api/v1/logout
exports.logout = catchAsyncErrors( async( req,res,next ) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
})

// Register owner => /api/v1/admin/register/owner
exports.registerOwner = catchAsyncErrors( async (req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role: 'owner'
    });

    res.status(200).json({
        success: true,
        user
    })
})

// Register booker => /api/v1/owner/register/booker
exports.registerBooker = catchAsyncErrors( async (req, res, next) => {

    const {name, email, password, boat} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role: 'booker',
        boat
    });

    res.status(200).json({
        success: true,
        user
    })
})

// Get all users => /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get all owners => /api/v1/admin/owners
exports.getAllOwners = catchAsyncErrors( async (req, res, next) => {

    const owners = await User.find({role: 'owner'});

    res.status(200).json({
        success: true,
        owners
    })
})

// Get a user => /api/v1/admin/user/:id
exports.getUser = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler('User not found',404));
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update profile => api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors( async (req, res, next) => {
    
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })
})

// Delete a user => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors( async (req, res, next) => {

    let user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler('User not found',404));
    }

    user = await User.findByIdAndRemove(req.params.id)

    res.status(200).json({
        success: true
    })
})