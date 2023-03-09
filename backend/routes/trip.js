const express = require('express')
const router = express.Router();

const {newTrip} = require('../controllers/tripController');

router.route('/admin/trip/new').post(newTrip);

module.exports = router;