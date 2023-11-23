const attributesRouter = require('express').Router()

const defaultAttributes = require('../defaultAttributes').attributes

attributesRouter.get('/', async (request, response) => {
    response.json(defaultAttributes).end()
})

module.exports = attributesRouter
