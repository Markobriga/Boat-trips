const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors( async( req,res,next ) => {

    const {name, email, password} = req.body;
    
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

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
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