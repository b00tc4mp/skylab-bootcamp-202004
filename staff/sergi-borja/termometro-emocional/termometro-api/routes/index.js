 const { env: { JWT_SECRET: SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUser, unRegisterUser } = require('./handlers')
const { handleError } = require('../helpers')
const { jwtVerifierExtractor } = require('../middlewares')
const bodyParser = require('body-parser')

const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)
const parseBody = bodyParser.json()

const api = new Router()


api.post('/users', verifyExtractJwt, parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

api.get('/users/:userId?', verifyExtractJwt, retrieveUser)

api.patch('/users/:userId?', verifyExtractJwt, parseBody, updateUser)

api.delete('/users/:userId?', verifyExtractJwt, parseBody, unRegisterUser)

module.exports = {
    api
}
