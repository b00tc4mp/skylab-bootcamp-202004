const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser } = ('./handlers')
const { handleError } = require('../helpers')
const bodyParser = require('body-parser')

const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)
const parseBody = bodyParser.json()

const api = new Router()

api.post('/users', parseBody, registerUser)

module.exports = {
    api
}
