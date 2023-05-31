const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { processPayment, sendStripeAPIKey } = require('../controllers/paymentController')  

router.route('/payment/process').post(isAuthenticatedUser, processPayment)
router.route('/payment/refund').post(isAuthenticatedUser, authorizeRoles("owner"), processPayment)
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeAPIKey)

module.exports = router;