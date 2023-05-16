const { UserModel } = require('./UserModel')
const { SiteModel } = require('./SiteModel')
const { PostModel } = require('./PostModel')
const { CommentModel } = require('./CommentModel')
const { VoteModel } = require('./VoteModel')

const User = UserModel
const Site = SiteModel
const Post = PostModel
const Comment = CommentModel
const Vote = VoteModel

// ASSOCIATIONS between models

// User connected to everything
User.hasMany(Site)
Site.belongsTo(User)

User.hasMany(Post)
Post.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Vote)
Vote.belongsTo(User)

// Site Post Comment Vote
Site.hasMany(Post)
Post.belongsTo(Site)

Post.hasMany(Comment)
Comment.belongsTo(Post)

Post.hasMany(Vote)
Vote.belongsTo(Post)

Comment.hasMany(Vote)
Vote.belongsTo(Comment)

// come back to this ?????
// Product.User = Product.belongsTo(User);

module.exports = {
    User,
    Site,
    Post,
    Comment,
    Vote
}