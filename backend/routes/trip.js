const express = require('express')
const router = express.Router();

const {newTrip, getTrips, getSingleTrip, updateTrip, deleteTrip, getTripsByBoat, getNextTrips, getNextTripsByBoat} = require('../controllers/tripController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/trips').get(getTrips);
router.route('/trip/:id').get(getSingleTrip);
router.route('/trips/next').get(getNextTrips);
router.route('/owner/trips/:user').get(isAuthenticatedUser, authorizeRoles('owner'), getTripsByBoat);
router.route('/trips/next/:boat').get(getNextTripsByBoat);


router.route('/admin/trip/new').post(isAuthenticatedUser, authorizeRoles('owner'), newTrip);

router.route('/admin/trip/:id').put(isAuthenticatedUser, authorizeRoles('owner'), updateTrip).delete(isAuthenticatedUser, authorizeRoles('owner'), deleteTrip);


module.exports = router;