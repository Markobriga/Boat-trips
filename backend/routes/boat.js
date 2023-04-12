const express = require('express')
const router = express.Router();

const { getBoats, newBoat, getSingleBoat, updateBoat, deleteBoat, createReview, getReviews, deleteReview, getBoatByOwner } = require('../controllers/boatController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/boats').get(getBoats);
router.route('/boat/:id').get(getSingleBoat);

router.route('/admin/boat/new').post(isAuthenticatedUser, authorizeRoles('owner'), newBoat);
router.route('/admin/boat/:id').get(isAuthenticatedUser, authorizeRoles('owner'), getBoatByOwner)
router.route('/admin/boat/:id').put(isAuthenticatedUser, authorizeRoles('owner'), updateBoat).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBoat);

router.route('/review').put(isAuthenticatedUser, createReview);
router.route('/reviews').get(isAuthenticatedUser, getReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router