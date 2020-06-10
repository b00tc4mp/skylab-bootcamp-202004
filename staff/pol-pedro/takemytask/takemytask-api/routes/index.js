const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticate, retrieveUser, updateUser, registerWorker } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/worker', parseBody, registerWorker)

api.post('/users/auth', parseBody, authenticate)

api.get('/users/', verifyExtractJwt, retrieveUser)

api.post('/users/update', verifyExtractJwt, parseBody, updateUser)

module.exports = {
    api
}