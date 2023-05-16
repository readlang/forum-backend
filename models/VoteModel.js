const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const VoteModel = sequelize.define('Vote', {
    // no attributes other than associations
},{
    // Other model options go here
})

module.exports = {
    VoteModel
}