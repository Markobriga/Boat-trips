const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack 
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message;

        // Wrong Mongoose Object ID Error
        if(err.name === 'CastError') {
            const message = `Resource not found with id of ${err.value}`;
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose Validation Error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose Duplicate Key Error
        if(err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT error
        if(err.name === 'JsonWebTokenError') {
            const message = 'Invalid token';
            error = new ErrorHandler(message, 400);
        }

        // Handling JWT expired error
        if(err.name === 'TokenExpiredError') {
            const message = 'Expired token';
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }

    
}