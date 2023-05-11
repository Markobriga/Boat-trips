const express = require('express');
const router = express.Router();

const {newReservation, getSingleReservation, getMyReservations, getAllReservations, processReservation, deleteReservation} = require('../controllers/reservationController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { newBookerReservation, getBookerReservations } = require('../controllers/bookerReservationController');

router.route('/reservation/new').post(isAuthenticatedUser, newReservation);
router.route('/reservation/:id').get(isAuthenticatedUser, getSingleReservation);
router.route('/reservations/me').get(isAuthenticatedUser, getMyReservations);

router.route('/admin/reservations').get(isAuthenticatedUser, authorizeRoles('admin'), getAllReservations)
router.route('/admin/reservation/:id').get(isAuthenticatedUser, authorizeRoles('admin'), processReservation)
.delete(isAuthenticatedUser,  authorizeRoles('admin'), deleteReservation);

router.route('/booker/reservation/new').post(isAuthenticatedUser, authorizeRoles('booker'), newBookerReservation)
router.route('/booker/reservations/me').get(isAuthenticatedUser, authorizeRoles('booker'), getBookerReservations)

module.exports = router;