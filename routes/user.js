const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
} = require('../controllers/userController')

// all on /user/ route
router.route('/')
    .get(getUsers)

router.route('/post')    
    .get(postUser)

module.exports = router