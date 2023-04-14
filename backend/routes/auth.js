const express = require('express');
const router = express.Router();

const { registerUser, loginUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, logout, getAllUsers, getUser, updateUser, deleteUser, registerOwner, registerBooker, getAllOwners, getAllBookers } = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/logout').get(logout);

router.route('/admin/register/owner').post(isAuthenticatedUser, authorizeRoles('admin') ,registerOwner)
router.route('/owner/register/booker').post(isAuthenticatedUser, authorizeRoles('owner') ,registerBooker)
router.route('/owner/bookers/:id').get(isAuthenticatedUser, authorizeRoles('owner') ,getAllBookers)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route('/admin/owners').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOwners);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUser)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;