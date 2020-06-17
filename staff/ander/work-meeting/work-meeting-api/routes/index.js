const { env: { JWT_SECRET:SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, addMemberDepartment } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')
debugger
const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

/* api.get('/users/addMemberDepart?', parseBody, addMemberDepartment)

api.get('/users/:userId?', verifyExtractJwt,retrieveUser ) */


module.exports = {
    api
}