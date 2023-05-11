const express = require('express')
const router = express.Router();

const { getBoats, newBoat, getSingleBoat, updateBoat, deleteBoat, createReview, getReviews, deleteReview, getBoatByOwner, getAdminBoats } = require('../controllers/boatController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/boats').get(getBoats);
router.route('/boat/:id').get(getSingleBoat);

router.route('/admin/boat/new').post(isAuthenticatedUser, authorizeRoles('owner'), newBoat);
router.route('/admin/boat/:id').get(isAuthenticatedUser, authorizeRoles('owner', "booker"), getBoatByOwner)
router.route('/admin/boat/:id').put(isAuthenticatedUser, authorizeRoles('owner'), updateBoat).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBoat);
router.route('/admin/boats').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminBoats)

router.route('/review').put(isAuthenticatedUser, createReview);
router.route('/reviews').get(isAuthenticatedUser, getReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router