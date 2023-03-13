const express = require('express')
const router = express.Router();

const { getBoats, newBoat, getSingleBoat, updateBoat, deleteBoat } = require('../controllers/boatController')

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/boats').get(isAuthenticatedUser, getBoats);
router.route('/boat/:id').get(getSingleBoat);

router.route('/admin/boat/new').post(newBoat);

router.route('/admin/boat/:id').put(updateBoat).delete(deleteBoat);

module.exports = router