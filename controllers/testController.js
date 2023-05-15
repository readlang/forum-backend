const {
    sql,
    sequelize
} = require('../config/db')

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

module.exports = {
    getTest
}


// CREATE TABLE users(
//     id SERIAL PRIMARY KEY,
//     username TEXT NOT NULL,
//     email TEXT NOT NULL,
//     password TEXT NOT NULL,
//     join_date TIMESTAMP,
//     admin BOOLEAN
// );