const express = require('express');
const router = express.Router();
const {
    getPosts,
    postPost,
    updatePost,
    deletePost,
} = require('../controllers/postController')

// all on /post/ route
router.route('/')
    .get(getPosts)
    .post(postPost)

router.route('/:postId')
    .put(updatePost)
    .delete(deletePost)

module.exports = router