 const { env: { JWT_SECRET: SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUser } = require('./handlers')
const { handleError } = require('../helpers')
const { jwtVerifierExtractor } = require('../middlewares')
const bodyParser = require('body-parser')

const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)
const parseBody = bodyParser.json()

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

api.get('/users', verifyExtractJwt, retrieveUser)

api.patch('/users', verifyExtractJwt, parseBody, updateUser)

module.exports = {
    api
}
