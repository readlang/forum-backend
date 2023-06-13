const {Site, Post, User} = require('../models/associationsIndex')

const getSites = async (req, res, next) => {
    try {
        const sites = await Site.findAll()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(sites)
    } catch (error) {
        next(error)
    }
}

const postSite = async (req, res, next) => {
    try {
        const newSite = {}
        if (req.body.name) newSite.name = req.body.name
        if (req.body.description) newSite.description = req.body.description
        if (req.body.url) newSite.url = req.body.url
        newSite.UserId = req.user.id

        const site = await Site.create(newSite)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(site)
    } catch (error) {
        next(error)
    }
}

const updateSite = async (req, res, next) => {
    try {
        const site = await Site.findByPk(req.params.siteId)

        if (req.body.name) site.name = req.body.name
        if (req.body.description) site.description = req.body.description
        if (req.body.url) site.url = req.body.url

        const result = await site.save()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (error) {
        next(error)
    }
}

const deleteSite = async (req, res, next) => {
    try {
        const result = await Site.destroy({
            where: { id: req.params.siteId }
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

// get all Posts for a particular Site (using siteId)
const getSitePosts = async (req, res, next) => {
    try {
        const site = await Site.findByPk(req.params.siteId)

        const posts = await Post.findAll({
            where: { SiteId: req.params.siteId },
            include: [{model: User, attributes: ['userName'] }] 
        })

        const sitePosts = JSON.parse(JSON.stringify(site))
        sitePosts.posts = JSON.parse(JSON.stringify(posts))

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(sitePosts)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getSites,
    postSite,
    updateSite,
    deleteSite,
    getSitePosts
}