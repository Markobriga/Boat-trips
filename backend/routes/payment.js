const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { processPayment } = require('../controllers/paymentController')  

router.route('/payment/process').post(isAuthenticatedUser, processPayment)

module.exports = router;