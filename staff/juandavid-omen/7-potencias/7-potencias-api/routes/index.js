const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, searchUsers, updateUser, deleteUser, createLesson, searchLessons, updateCart, retrieveCart, deleteCart, placeOrder } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

api.patch('/users', verifyExtractJwt, parseBody, updateUser)

api.get('/users/search', verifyExtractJwt, searchUsers)

api.get('/users', verifyExtractJwt, retrieveUser)

api.delete('/users', verifyExtractJwt, deleteUser)

api.post('/lessons', verifyExtractJwt, parseBody, createLesson)

api.get('/lessons/search', searchLessons)

api.put('/carts', verifyExtractJwt, parseBody, updateCart)

api.get('/carts', verifyExtractJwt, retrieveCart)

api.delete('/carts', verifyExtractJwt, deleteCart)

api.post('/orders', verifyExtractJwt, placeOrder)

module.exports = {
  api
}
