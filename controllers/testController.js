const { sql, sequelize } = require('../config/db')
const { User, Site, Post, Comment } = require('../models/associationsIndex')

const getTest = async (req, res, next) => {
    try {
        const example = await sql`
            SELECT * FROM playing_with_neon

        `
        console.log("test controller hit!")
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            msg: "test endpoint hit", 
            data: example    
        })
    } catch (error) {
        next(error);
    }

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('-Unable to connect to the database:-', error);
    }
}

// endpoint:  /test/sync
const syncDBtables = async (req, res, next) => {
    try {
        await User.sync({force: true}) 
        await Site.sync({force: true})
        await Post.sync({force: true})
        await Comment.sync({force: true})
        console.log("All tables should be created")
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({msg: "All tables should be created"})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTest,
    syncDBtables
}