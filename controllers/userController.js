const { User } = require('../models/associationsIndex')

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

const postUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({msg: user})
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId)

        if (req.body.userName) user.userName = req.body.userName
        if (req.body.email) user.email = req.body.email
        if (req.body.password) user.password = req.body.password
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

module.exports = {
    getUsers,
    postUser,
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