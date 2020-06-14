const { env: { JWT_SECRET: SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, searchUsers, deleteUser, createProduct, searchProducts, updateCart, retrieveCart, deleteCart, placeOrder } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

api.get('/users/search', verifyExtractJwt, searchUsers)

api.get('/users/:userId', verifyExtractJwt, retrieveUser)

api.delete('/users/:userId', verifyExtractJwt, deleteUser)

api.post('/products', verifyExtractJwt, parseBody, createProduct)

api.get('/products/search', searchProducts)

api.put('/carts', verifyExtractJwt, parseBody, updateCart)

api.get('/carts', verifyExtractJwt, retrieveCart)

api.delete('/carts', verifyExtractJwt, deleteCart)

api.post('/orders', verifyExtractJwt, placeOrder)

module.exports = {
  api
}
