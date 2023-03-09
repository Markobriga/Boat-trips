const express = require('express')
const router = express.Router();

const {newTrip, getTrips} = require('../controllers/tripController');

router.route('/trips').get(getTrips);

router.route('/admin/trip/new').post(newTrip);


module.exports = router;