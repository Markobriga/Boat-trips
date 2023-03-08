const express = require('express')
const router = express.Router();

const { getBoats } = require('../controllers/boatController')

router.route('/boats').get(getBoats);



module.exports = router