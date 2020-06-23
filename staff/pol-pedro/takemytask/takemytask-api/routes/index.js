const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUser, registerWorker, addRates, addComments, creatChat, addMessage, retrieveChat, searchWorker, retriveChatId } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/worker', parseBody, registerWorker)

api.post('/worker/search', parseBody, searchWorker)

api.post('/users/auth', parseBody, authenticateUser)

api.post('/users/retrive', verifyExtractJwt, parseBody, retrieveUser)

api.post('/update', verifyExtractJwt, parseBody, updateUser)

api.post('/rates', verifyExtractJwt, parseBody, addRates)

api.post('/comments', verifyExtractJwt, parseBody, addComments)

api.post('/chat/create', verifyExtractJwt, parseBody, creatChat)

api.post('/chat/message', verifyExtractJwt, parseBody, addMessage)

api.post('/chat', verifyExtractJwt, parseBody, retrieveChat),

api.get('/chat/retrive' ,verifyExtractJwt, retriveChatId)

module.exports = {
    api
}