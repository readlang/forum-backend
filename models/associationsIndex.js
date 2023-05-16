const { UserModel } = require('./UserModel')
const { SiteModel } = require('./SiteModel')

// ASSOCIATIONS
UserModel.hasMany(SiteModel)
SiteModel.belongsTo(UserModel)

// Product.User = Product.belongsTo(User);

const User = UserModel
const Site = SiteModel

module.exports = {
    User,
    Site
}