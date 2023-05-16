const {Comment} = require('../models/associationsIndex')

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.findAll()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(comments)
    } catch (error) {
        next(error)
    }
}

const postComment = async (req, res, next) => {
    try {
        const comment = await Comment.create(req.body)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(comment)
    } catch (error) {
        next(error)
    }
}

const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId)

        if (req.body.text) comment.text = req.body.text
        if (req.body.votes) comment.votes = req.body.votes
    

        const result = await comment.save()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const result = await Comment.destroy({
            where: { id: req.params.commentId }
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
    getComments,
    postComment,
    updateComment,
    deleteComment,
}