const { env: { SECRET} } = process

const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, confirmUser, retrieveAllUsers, revokeUnrevokeUser, unregisterUser, updateUser,
    logPh, logTemperature, retrieveTemperatures, retrievePhs, retrieveLastTemperature, retrieveLastPh,
    createEvent, updateEvent, removeEvent, retrieveEvents }= require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')


const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

//user//

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

api.get('/users/:userId?', verifyExtractJwt, retrieveUser)

api.get('/usersall', verifyExtractJwt, retrieveAllUsers)

api.patch('/users/confirm/:userId?',  confirmUser)

api.patch('/users/revoke/:userId?', revokeUnrevokeUser)

api.delete('/users/:userId?', verifyExtractJwt, unregisterUser)

api.patch('/users/:userId?', parseBody,updateUser)

//arduino//

api.post('/temperature/:arduinoId?', parseBody, logTemperature)

api.post('/ph/:arduinoId?',parseBody, logPh)

api.get('/temperature/all', verifyExtractJwt, retrieveTemperatures)

api.get('/ph/all', verifyExtractJwt, retrievePhs)

api.get('/temperature', verifyExtractJwt, retrieveLastTemperature)

api.get('/ph', verifyExtractJwt, retrieveLastPh)

//events//

api.post('/event', verifyExtractJwt,createEvent)

api.delete('/event/:eventId?', verifyExtractJwt,removeEvent)

api.get('/event/:eventId?', verifyExtractJwt,retrieveEvents)

api.patch('/event/:eventId?', parseBody ,verifyExtractJwt, updateEvent)

//others//

api.get('*')

module.exports = {
    api
}