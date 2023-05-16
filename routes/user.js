const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController')

// all on /user/ route
router.route('/')
    .get(getUsers)
    .post(postUser)

router.route('/:userId')
    .put(updateUser)
    .delete(deleteUser)

module.exports = router