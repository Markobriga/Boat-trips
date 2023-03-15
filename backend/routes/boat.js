const express = require('express')
const router = express.Router();

const { getBoats, newBoat, getSingleBoat, updateBoat, deleteBoat, createReview, getReviews } = require('../controllers/boatController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/boats').get(getBoats);
router.route('/boat/:id').get(getSingleBoat);

router.route('/admin/boat/new').post(isAuthenticatedUser, authorizeRoles('admin'), newBoat);

router.route('/admin/boat/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateBoat).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBoat);

router.route('/review').put(isAuthenticatedUser, createReview);
router.route('/reviews').get(isAuthenticatedUser, getReviews);

module.exports = router