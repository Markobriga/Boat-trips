const express = require('express')
const router = express.Router();

const {newTrip, getTrips, getSingleTrip, updateTrip, deleteTrip} = require('../controllers/tripController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/trips').get(getTrips);
router.route('/trip/:id').get(getSingleTrip);

router.route('/admin/trip/new').post(isAuthenticatedUser, newTrip);

router.route('/admin/trip/:id').put(isAuthenticatedUser, updateTrip).delete(isAuthenticatedUser, deleteTrip);


module.exports = router;