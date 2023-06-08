const express = require('express');
const router = express.Router();
const {
    getSites,
    postSite,
    updateSite,
    deleteSite,
    getSitePosts
} = require('../controllers/siteController')

const protectedRoute = require('../middlewares/auth')

// all on /site/ route
router.route('/')
    .get(getSites)
    .post(protectedRoute, postSite)

router.route('/:siteId')
    .put(updateSite)
    .delete(deleteSite)

// get all Posts for a Site (siteId)
router.route('/:siteId/posts')
    .get(getSitePosts)

module.exports = router