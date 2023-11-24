const { request, response } = require('express')

const attributesRouter = require('express').Router()

const defaultAttributes = require('../defaultAttributes').attributes
const CONSTANTS = require('../constants')

attributesRouter.get('/', async (request, response) => {
    response.json(defaultAttributes).end()
})

attributesRouter.get('/multexpdropped', async (request, response) => {
    const multExpDropped = CONSTANTS.MULT_EXP_DROPPED
    response.json(multExpDropped).end()
} )

attributesRouter.get('/expreq', async (request, response) => {
    const calculateExpReq = CONSTANTS.calculateExpReq
    response.json(calculateExpReq).end()
})

module.exports = attributesRouter
