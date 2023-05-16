const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const CommentModel = sequelize.define('Comment', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    nestingDepth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    parentComment: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    // Other model options go here
})

module.exports = {
    CommentModel
}