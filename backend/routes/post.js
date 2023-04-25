const express = require('express')
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getPosts, getSinglePost, newPost, updatePost, deletePost } = require('../controllers/postController');

router.route('/posts').get(getPosts)
router.route('/post/:id').get(getSinglePost)

router.route('/admin/post/new').post(isAuthenticatedUser, authorizeRoles('admin'), newPost)
router.route('/admin/post/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updatePost).delete(isAuthenticatedUser, authorizeRoles('admin'), deletePost)

module.exports = router