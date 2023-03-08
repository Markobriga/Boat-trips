const express = require('express')
const router = express.Router();

const { getBoats, newBoat, getSingleBoat } = require('../controllers/boatController')

router.route('/boats').get(getBoats);
router.route('/boat/:id').get(getSingleBoat);

router.route('/boat/new').post(newBoat);

module.exports = router