const { env: { SECRET } } = process

const { Router } = require('express')
const { retrieveTermsById, retrieveTermsByQuery, registerSymptom, registerSymptomList, updateSymptom, sendSymptomlistByEmail, registerAdmin, authenticateAdmin, retrieveAllSymptoms } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.get('/terms/:id',retrieveTermsById)

api.get('/terms/query/:query', retrieveTermsByQuery)

api.post('/symptoms', parseBody, registerSymptom)

api.post('/symptoms/update', parseBody, updateSymptom)

api.get('/symptoms/retrieve', verifyExtractJwt, retrieveAllSymptoms)

api.post('/symptomlists', parseBody, registerSymptomList)

api.post('/symptomlists/email', parseBody, sendSymptomlistByEmail)

api.post('/admins', parseBody, registerAdmin)

api.post('/admins/auth', parseBody, authenticateAdmin)

module.exports = {
    api
}