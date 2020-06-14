const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUser, retrieveUserBlueprints, retrieveBlueprint, saveBlueprint } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

//api.get('/users/:userId?', verifyExtractJwt, retrieveUser) //busqueda de usuarios para favPlanes(opcional)

api.get('/users/update', parseBody, verifyExtractJwt, updateUser)

api.get('/users/blueprints', verifyExtractJwt, retrieveUserBlueprints)

api.get('/blueprint/:blueprintId?', verifyExtractJwt, retrieveBlueprint)

api.post('/blueprint', verifyExtractJwt, saveBlueprint) //PATCH o POST? la logica si no existe lo crea y si existe actualiza... ??

module.exports = {
    api
}