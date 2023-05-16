const express = require('express');
const router = express.Router();
const {
    getVotes,
    postVote,
    updateVote,
    deleteVote,
} = require('../controllers/voteController')

// all on /vote/ route
router.route('/')
    .get(getVotes)
    .post(postVote)

router.route('/:voteId')
    .put(updateVote)
    .delete(deleteVote)

module.exports = router