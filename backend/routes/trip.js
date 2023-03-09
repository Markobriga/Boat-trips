const express = require('express')
const router = express.Router();

const {newTrip, getTrips, getSingleTrip, updateTrip} = require('../controllers/tripController');

router.route('/trips').get(getTrips);
router.route('/trip/:id').get(getSingleTrip);

router.route('/admin/trip/new').post(newTrip);

router.route('/admin/trip/:id').put(updateTrip);


module.exports = router;