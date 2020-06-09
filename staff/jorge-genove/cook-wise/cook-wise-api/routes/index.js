const { env: { SECRET } } = process

const { Router } = require('express')
const { 
    registerUser, 
    authenticateUser, 
    createIngredient,
    createRecipe,
    searchRecipe,
    toogleFavorite,
    retrieveFavorite,
    retrieveUser
} = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticateUser)

api.post('/ingredients', parseBody, createIngredient)

api.post('/recipes', parseBody, verifyExtractJwt, createRecipe)

api.get('/recipes', verifyExtractJwt, searchRecipe)

api.patch('/toogle',[parseBody,verifyExtractJwt],toogleFavorite)

api.get('/retrievefavorites', verifyExtractJwt, retrieveFavorite)

api.get('/users/retrieve', verifyExtractJwt, retrieveUser)

module.exports = {
    api
}