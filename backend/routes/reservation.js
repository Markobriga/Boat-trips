const express = require('express');
const router = express.Router();

const {newReservation, getSingleReservation, getMyReservations, getAllReservations, processReservation, deleteReservation} = require('../controllers/reservationController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { newBookerReservation, getBookerReservations, getAllTripsReservations, deleteBookerReservation } = require('../controllers/bookerReservationController');

router.route('/reservation/new').post(isAuthenticatedUser, newReservation);
router.route('/reservation/:id').get(isAuthenticatedUser, getSingleReservation);
router.route('/reservations/me').get(isAuthenticatedUser, getMyReservations);

router.route('/admin/reservations').get(isAuthenticatedUser, authorizeRoles('admin'), getAllReservations)
router.route('/admin/reservation/:id').get(isAuthenticatedUser, authorizeRoles('admin'), processReservation)
.delete(isAuthenticatedUser,  authorizeRoles('admin'), deleteReservation);

router.route('/booker/reservation/new').post(isAuthenticatedUser, authorizeRoles('owner', 'booker'), newBookerReservation)
router.route('/booker/reservations/me').get(isAuthenticatedUser, authorizeRoles('owner','booker'), getBookerReservations)
router.route('/owner/reservations/:id').get(isAuthenticatedUser, authorizeRoles('owner','booker'), getAllTripsReservations)
router.route('/booker/reservation/:id').delete(isAuthenticatedUser, authorizeRoles('owner','booker'), deleteBookerReservation)

module.exports = router;