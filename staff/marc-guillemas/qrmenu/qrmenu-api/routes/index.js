const { env: { SECRET } } = process

const { Router } = require('express')
const { registerEstablishment, authenticateEstablishment } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()
debugger
api.post('/establishment', parseBody, registerEstablishment)
api.post('/establishment/auth', parseBody, authenticateEstablishment)

module.exports = {
    api
}