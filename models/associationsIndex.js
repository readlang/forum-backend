const { UserModel } = require('./UserModel')
const { SiteModel } = require('./SiteModel')
const { PostModel } = require('./PostModel')
const { CommentModel } = require('./CommentModel')

const User = UserModel
const Site = SiteModel
const Post = PostModel
const Comment = CommentModel

// Associations between models
User.hasMany(Site)
Site.belongsTo(User)

User.hasMany(Post)
Post.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Site.hasMany(Post)
Post.belongsTo(Site)

Post.hasMany(Comment)
Comment.belongsTo(Post)

// come back to this ?????
// Product.User = Product.belongsTo(User);

module.exports = {
    User,
    Site,
    Post,
    Comment
}