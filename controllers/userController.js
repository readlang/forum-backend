const { User } = require('../models/associationsIndex')
const bcrypt = require('bcryptjs')

// get all users - admin only route, auth first
const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(users)
    } catch (error) {
        next(error)
    }
}

// create a new user (sign up) - no auth
const postUser = async (req, res, next) => {
    try {
        const user = User.build(req.body)
        user.password = await hashPassword(user.password)
        await user.save()
        // this will send res with jwt as both json and cookie
        sendTokenResponse(user, 201, res)
    } catch (error) {
        next(error)
    }
}

// login - no auth
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password) throw new Error("Please provide an username and password")

        const user = await User.findOne({ where: {userName: username} })    //.select('+password') /////////
        if (!user) throw new Error("Username does not exist")

        const isMatch = await user.matchPassword(password)
        if (!isMatch) throw new Error('Invalid Password')

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}

// update password - authenticate first
const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id)

        const passwordMatches = await user.matchPassword(req.body.password)
        if (!passwordMatches) throw new Error('Password is incorrect')

        user.password = await hashPassword(req.body.newPassword)
        await user.save()

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}

// logout - authenticate first
const logout = async (req, res, next) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({success: true, msg: "Successfully logged out"})
    } catch (error) {
        next(error)
    }
}

// get a single user - authenticate first ////////////////////////// why is this showing info about other users?
const getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)
    } catch (error) {
        next(error)
    }
}

// update user info - authenticate first /////////////////////////// why is this updating info about other users?
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId)

        if (req.body.userName) user.userName = req.body.userName
        if (req.body.email) user.email = req.body.email
        //if (req.body.password) user.password = req.body.password
        if (req.body.admin) user.admin = req.body.admin

        const result = await user.save()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (error) {
        next(error)
    }
}

// delete a single user - auth first ///////////////////////////////// why is this deleting another user?
const deleteUser = async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.userId }
        })
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            deletedItems: result
        })
    } catch (error) {
        next(error)
    }
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const options ={
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
        httpOnly: true
    }
    res
    .status(statusCode)
    .cookie('token', token, options )
    .json({success: true, token})
}

// function to hash the plain text password
const hashPassword = async (unhashedPassword) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(unhashedPassword, salt)
    return hashedPassword
}

module.exports = {
    getUsers,
    postUser,

    login,
    updatePassword,
    logout,

    getUser,
    updateUser,
    deleteUser,
}


/*
CRUD

// increment / decrement
const jane = await User.create({ name: "Jane", age: 100 });
const incrementResult = await jane.increment('age', { by: 2 });
// Note: to increment by 1 you can omit the `by` option and just do `user.increment('age')`
// In PostgreSQL, `incrementResult` will be the updated user, unless the option
// `{ returning: false }` was set (and then it will be undefined).

*/