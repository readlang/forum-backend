const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const SiteModel = sequelize.define('Site', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
},{
    // Other model options go here
})

module.exports = {
    SiteModel
}