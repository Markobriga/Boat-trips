const express = require('express')
const router = express.Router();

const {newTrip, getTrips, getSingleTrip} = require('../controllers/tripController');

router.route('/trips').get(getTrips);
router.route('/trip/:id').get(getSingleTrip);

router.route('/admin/trip/new').post(newTrip);


module.exports = router;