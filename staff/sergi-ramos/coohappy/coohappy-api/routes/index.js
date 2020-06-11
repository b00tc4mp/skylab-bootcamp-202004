const { env: { JWT_SECRET: SECRET } } = process

const { Router } = require('express')
const { registerUser, authenticate, retrieveUser,registerCohousing, retrieveCohousing, updateUser, updateCohousing, sendMessage, 
    retrieveMessages, joinToCohousing, addFood, substractFood, retrieveUserFoodList, retrieveAllUsersFoodList, addDateLaundry } = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)

api.post('/users/auth', parseBody, authenticate)

api.get('/users/:userId?', verifyExtractJwt, retrieveUser)

api.patch('/users', [parseBody, verifyExtractJwt], updateUser)

api.post('/cohousings', [parseBody, verifyExtractJwt], registerCohousing)

api.get('/cohousings', verifyExtractJwt, retrieveCohousing)

api.patch('/cohousings', [parseBody, verifyExtractJwt], updateCohousing)

api.post('/cohousings/message', [parseBody, verifyExtractJwt], sendMessage )

api.get('/cohousings/message', verifyExtractJwt, retrieveMessages)

api.post('/cohousings/add', [parseBody, verifyExtractJwt], joinToCohousing)

api.patch('/users/food/add', [parseBody, verifyExtractJwt], addFood)

api.patch('/users/food/substract', [parseBody, verifyExtractJwt], substractFood)

api.get('/user/food', verifyExtractJwt, retrieveUserFoodList )

api.get('/cohousings/food', verifyExtractJwt, retrieveAllUsersFoodList )

api.post('/cohousings/laundry', [parseBody, verifyExtractJwt], addDateLaundry)



module.exports = {
    api
}