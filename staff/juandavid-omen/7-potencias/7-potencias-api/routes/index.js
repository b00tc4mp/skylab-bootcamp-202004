const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, deleteUser, createClass, searchClass, updateCart, deleteCart, placeOrder } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

api.get('/users/:userId?', verifyExtractJwt, retrieveUser)

api.delete('/users/:userId', verifyExtractJwt, deleteUser)

api.post('/class', verifyExtractJwt, parseBody, createClass)

api.get('/class/search?query=q', searchClass)

api.put('/cart', verifyExtractJwt, parseBody, updateCart)

api.delete('/cart', verifyExtractJwt, deleteCart)

api.post('/orders', verifyExtractJwt, placeOrder)

module.exports = {
  api
}
