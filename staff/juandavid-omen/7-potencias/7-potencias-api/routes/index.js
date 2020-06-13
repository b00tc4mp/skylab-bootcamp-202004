const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, deleteUser, createProduct, searchProducts, updateCart, deleteCart, placeOrder } = require('./handlers')
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

api.post('/product', verifyExtractJwt, parseBody, createProduct)

api.get('/product/search?query=q', searchProducts)

api.put('/cart', verifyExtractJwt, parseBody, updateCart)

api.delete('/cart', verifyExtractJwt, deleteCart)

api.post('/orders', verifyExtractJwt, placeOrder)

module.exports = {
  api
}
