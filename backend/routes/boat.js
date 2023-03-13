const express = require('express')
const router = express.Router();

const { getBoats, newBoat, getSingleBoat, updateBoat, deleteBoat } = require('../controllers/boatController')

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/boats').get(getBoats);
router.route('/boat/:id').get(getSingleBoat);

router.route('/admin/boat/new').post(isAuthenticatedUser, newBoat);

router.route('/admin/boat/:id').put(isAuthenticatedUser, updateBoat).delete(isAuthenticatedUser, deleteBoat);

module.exports = router