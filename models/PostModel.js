const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const PostModel = sequelize.define('Post', {
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
},{
    // Other model options go here
})

module.exports = {
    PostModel
}