const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')

const UserModel = sequelize.define('User', {
    // Model attributes are defined here
    userName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    // Other model options go here
});
  
// `sequelize.define` also returns the model
console.log(UserModel === sequelize.models.User); // true

module.exports = {
    UserModel
}


/*
DataTypes:
TEXT
BOOLEAN
INTEGER
FLOAT
DATE
UUID

*/