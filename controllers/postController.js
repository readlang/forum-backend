const {Post, Comment, User} = require('../models/associationsIndex')

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(posts)
    } catch (error) {
        next(error)
    }
}

const postPost = async (req, res, next) => {
    try {
        const post = await Post.create({...req.body, UserId: req.user.id})

        // this will add the User.userName data into the return post object
        post.dataValues.User = {}
        post.dataValues.User.userName = req.user.userName
        
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(post)
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId)

        if (req.body.title) post.title = req.body.title
        if (req.body.url) post.url = req.body.url
        if (req.body.votes) post.votes = req.body.votes

        const result = await post.save()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const result = await Post.destroy({
            where: { id: req.params.postId }
        })
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            deletedItems: result
        })
    } catch (error) {
        next(error)
    }
}

// get all Comments for a Post (postId)
const getPostComments = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId)

        const comments = await Comment.findAll({
            where: { PostId: req.params.postId },
            include: [{ model: User, attributes: ['userName'] }]
        })

        const postComments = JSON.parse(JSON.stringify(post))
        postComments.comments = JSON.parse(JSON.stringify(comments))
        
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(postComments)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPosts,
    postPost,
    updatePost,
    deletePost,
    getPostComments
}