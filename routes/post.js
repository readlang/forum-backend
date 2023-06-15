const express = require('express');
const router = express.Router();
const {
    getPosts,
    postPost,
    updatePost,
    deletePost,
    getPostComments
} = require('../controllers/postController')

const protectedRoute = require('../middlewares/auth')

// all on /post/ route
router.route('/')
    .get(getPosts)
    .post(protectedRoute, postPost)

router.route('/:postId')
    .put(protectedRoute, updatePost)
    .delete(protectedRoute, deletePost)

// get all Comments for a Post (postId)    
router.route('/:postId/comments')
    .get(getPostComments)

module.exports = router