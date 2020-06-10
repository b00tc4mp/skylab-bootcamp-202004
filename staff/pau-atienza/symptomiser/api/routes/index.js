const { env: { SECRET } } = process

const { Router } = require('express')
const { retrieveTermsById } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.get('/terms/:id', parseBody, retrieveTermsById)

// api.post('/users/auth', parseBody, authenticateUser)

// api.get('/terms/:query?', verifyExtractJwt, retrieveUser)

module.exports = {
    api
}