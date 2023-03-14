const express = require('express');
const router = express.Router();

const {newReservation} = require('../controllers/reservationController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/reservation/new').post(isAuthenticatedUser, newReservation, authorizeRoles);

module.exports = router;