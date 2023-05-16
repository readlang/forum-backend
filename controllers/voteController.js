const {Vote} = require('../models/associationsIndex')

const getVotes = async (req, res, next) => {
    try {
        const votes = await Vote.findAll()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(votes)
    } catch (error) {
        next(error)
    }
}

const postVote = async (req, res, next) => {
    try {
        const vote = await Vote.create(req.body)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(vote)
    } catch (error) {
        next(error)
    }
}

const updateVote = async (req, res, next) => {
    try {
        const vote = await Vote.findByPk(req.params.voteId)

        // if (req.body.name) vote.name = req.body.name

        const result = await vote.save()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (error) {
        next(error)
    }
}

const deleteVote = async (req, res, next) => {
    try {
        const result = await Vote.destroy({
            where: { id: req.params.voteId }
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
    getVotes,
    postVote,
    updateVote,
    deleteVote,
}