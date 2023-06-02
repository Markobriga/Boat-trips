const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Process payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'eur',
        metadata: {integration_check: 'accept_a_payment'}
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

// Refund payment => /api/v1/payment/refund
exports.refund = catchAsyncErrors(async (req, res, next) => {

    const refund = await stripe.refunds.create({
        payment_intent: req.body.paymentIntent
    })

    res.status(200).json({
        success: true,
        refund: refund
    })
})

// Send stripe API Key => /api/v1/stripeapi
exports.sendStripeAPIKey = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})