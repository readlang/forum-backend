const express = require('express');
const router = express.Router();
const {
    getComments,
    postComment,
    updateComment,
    deleteComment,
} = require('../controllers/commentController')

const protectedRoute = require('../middlewares/auth')

// all on /comment/ route
router.route('/')
    .get(getComments)
    .post(protectedRoute, postComment)

router.route('/:commentId')
    .put(protectedRoute, updateComment)
    .delete(protectedRoute, deleteComment)

module.exports = router