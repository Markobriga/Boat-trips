const express = require('express');
const router = express.Router();

const {newReservation, getSingleReservation, getMyReservations, getAllReservations, processReservation} = require('../controllers/reservationController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/reservation/new').post(isAuthenticatedUser, newReservation);
router.route('/reservation/:id').get(isAuthenticatedUser, getSingleReservation);
router.route('/reservations/me').get(isAuthenticatedUser, getMyReservations);

router.route('/admin/reservations').get(isAuthenticatedUser, authorizeRoles('admin'), getAllReservations)
router.route('/admin/reservation/:id').get(isAuthenticatedUser, authorizeRoles('admin'), processReservation)

module.exports = router;