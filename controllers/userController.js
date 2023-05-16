const { User, Site } = require('../models/associationsIndex')

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({msg: users})
    } catch (error) {
        next(error)
    }
}

const postUser = async (req, res, next) => {
    try {
        const example = {userName: "Jane", email: "james@example.com", password: "1234"}
        const user = await User.create(example)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({msg: user})
    } catch (error) {
        next(error)
    }
}

const syncUsers = async (req, res, next) => {
    try {
        await User.sync({force: true}) 
        await Site.sync({force: true})
        console.log("User model should be created")
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({msg: "User model should be created"})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    postUser,
    syncUsers
}


/*
CRUD
READ:
const users = await User.findAll()

CREATE AND UPDATE:
const jane = User.build({ name: "Jane" }); - only creates object, does not save to DB
await jane.save(); - saves to DB
const jane = await User.create({ name: "Jane" }); // build and save in one method

DELETE:
await jain.destroy(); // deletes from DB

// increment / decrement
const jane = await User.create({ name: "Jane", age: 100 });
const incrementResult = await jane.increment('age', { by: 2 });
// Note: to increment by 1 you can omit the `by` option and just do `user.increment('age')`
// In PostgreSQL, `incrementResult` will be the updated user, unless the option
// `{ returning: false }` was set (and then it will be undefined).

*/