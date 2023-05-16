const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    syncUsers
} = require('../controllers/userController')

// all on /user/ route
router.route('/')
    .get(getUsers)

router.route('/post')    
    .get(postUser)

router.route('/sync')
    .get(syncUsers) 

module.exports = router