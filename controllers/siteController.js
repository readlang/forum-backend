const {Site} = require('../models/associationsIndex')

const postSite = async (req, res, next) => {
    try {
        const example = {name: "NYT", description: "a news site", url: "http://example.com", UserId: 1}
        const site = await Site.create(example)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({msg: site})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postSite
}