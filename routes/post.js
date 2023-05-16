const express = require('express');
const router = express.Router();
const {
    getPosts,
    postPost,
    updatePost,
    deletePost,
    getPostComments
} = require('../controllers/postController')

// all on /post/ route
router.route('/')
    .get(getPosts)
    .post(postPost)

router.route('/:postId')
    .put(updatePost)
    .delete(deletePost)

// get all Comments for a Post (postId)    
router.route('/:postId/comments')
    .get(getPostComments)

module.exports = router