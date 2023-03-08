const express = require('express')
const router = express.Router();

const { getBoats, newBoat } = require('../controllers/boatController')

router.route('/boats').get(getBoats);

router.route('/boat/new').post(newBoat);

module.exports = router