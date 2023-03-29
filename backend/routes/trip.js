const express = require('express')
const router = express.Router();

const {newTrip, getTrips, getSingleTrip, updateTrip, deleteTrip, getTripsByBoat, getNextTrips, getNextTripsByBoat} = require('../controllers/tripController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/trips').get(getTrips);
router.route('/trip/:id').get(getSingleTrip);
router.route('/trips/next').get(getNextTrips);
router.route('/trips/:boat').get(getTripsByBoat);
router.route('/trips/next/:boat').get(getNextTripsByBoat);


router.route('/admin/trip/new').post(isAuthenticatedUser, authorizeRoles('admin'), newTrip);

router.route('/admin/trip/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateTrip).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteTrip);


module.exports = router;