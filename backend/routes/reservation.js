const express = require('express');
const router = express.Router();

const {newReservation, getSingleReservation, getMyReservations, getAllReservations} = require('../controllers/reservationController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/reservation/new').post(isAuthenticatedUser, newReservation);
router.route('/reservation/:id').get(isAuthenticatedUser, getSingleReservation);
router.route('/reservations/me').get(isAuthenticatedUser, getMyReservations);

router.route('/admin/reservations').get(isAuthenticatedUser, authorizeRoles('admin'), getAllReservations)

module.exports = router;