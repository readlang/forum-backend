const express = require('express');
const router = express.Router();
const {
    getSites,
    postSite,
    syncSites
} = require('../controllers/siteController')

// all on /site/ route
// router.route('/')
//     .get(getSites)

router.route('/post')    
    .get(postSite)



module.exports = router