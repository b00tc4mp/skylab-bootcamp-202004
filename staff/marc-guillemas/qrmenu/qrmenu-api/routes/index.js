const { env: { SECRET } } = process

const { Router } = require('express')
const { registerEstablishment, authenticate, retrieveEstablishment, registerWorker, addDish, retrieveDishes } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()
debugger
api.post('/establishment', parseBody, registerEstablishment)
api.post('/user/auth', parseBody, authenticate)
api.get('/establishment', verifyExtractJwt, retrieveEstablishment)
api.post('/worker', parseBody, verifyExtractJwt, registerWorker)
api.post('/dishes', parseBody, verifyExtractJwt, addDish)
api.get('/dishes', verifyExtractJwt, retrieveDishes)

module.exports = {
    api
}