const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, addUserCard, retrieveUserCard, retrieveUserBalance, addProduct } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

api.get('/users/', verifyExtractJwt, retrieveUser)

api.post('/users/card', parseBody, verifyExtractJwt, addUserCard)

api.get('/users/card', verifyExtractJwt, retrieveUserCard)

api.get('/users/balance', verifyExtractJwt, retrieveUserBalance)

api.post('/users/product', parseBody, verifyExtractJwt, addProduct)

module.exports = {
    api
}