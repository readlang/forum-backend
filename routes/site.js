const express = require('express');
const router = express.Router();
const {
    getSites,
    postSite,
    updateSite,
    deleteSite,
} = require('../controllers/siteController')

// all on /site/ route
router.route('/')
    .get(getSites)
    .post(postSite)

router.route('/:siteId')
    .put(updateSite)
    .delete(deleteSite)

module.exports = router