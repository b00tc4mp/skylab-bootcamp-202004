const { env: { JWT_SECRET: SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticate, retrieveUser,registerCohousing, retrieveCohousing } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticate)

api.get('/users/:userId?', verifyExtractJwt, retrieveUser)

api.post('/cohousings', parseBody, registerCohousing)

api.get('/cohousings', verifyExtractJwt, retrieveCohousing)



module.exports = {
    api
}