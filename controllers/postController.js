const {Post} = require('../models/associationsIndex')

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
        const post = await Post.create(req.body)
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

module.exports = {
    getPosts,
    postPost,
    updatePost,
    deletePost,
}