const { env: { SECRET } } = process

const { Router } = require('express')
const { registerEstablishment } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/establishments', parseBody, registerEstablishment)


module.exports = {
    api
}