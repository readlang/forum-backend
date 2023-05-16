const express = require('express');
const router = express.Router();
const {
    getComments,
    postComment,
    updateComment,
    deleteComment,
} = require('../controllers/commentController')

// all on /comment/ route
router.route('/')
    .get(getComments)
    .post(postComment)

router.route('/:commentId')
    .put(updateComment)
    .delete(deleteComment)

module.exports = router