require('dotenv').config()

const { argv: [ , , PORT_CLI], env: {PORT: PORT_ENV, SECRET, MONGODB_URL} } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require ('express')
const { registerUser } = require('plates-server-logic')
const bodyParser = require('body-parser')
const { handleError } = require('./helpers')
const { utils: { cors, jwtPromised }} = require('plates-commons')
const { jwtVerifierExtractor } = require('./middlewares')
const jwtVerifierExtractor = require('./middlewares/jwt-verifier-extractor')
const mongoose  = require('plates-data')
const createRestaurant = require('../plates-server-logic/create-restaurant')
const createMenu = require('../plates-server-logic/create-menu')
const searchRestaurant = require('../plates-server-logic/search-restaurant')

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log(`Connected to ${MONGODB_URL}`)

        const app = express()

        const parseBody = bodyParser()

        const verifyExtractJwt =  jwtVerifierExtractor(SECRET, handleError)

        app.use(cors) 


        app.post('/users', parseBody, (req, res) =>{
            const { body: { name, surname, email, password }} = req

            try {
                registerUser(name, surname, email, password)
            } catch (error) {
                handleError(error, res)               
            }
        })

        app.post('/users/auth', parseBody, (req, res) => {
            const { body: { email, password } } = req

            try {
                authenticateUser(email, password)
                    .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: '1d' }))
                    .then(token => res.send({ token }))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)    
            }
        })

        app.post('/users/restaurant', parseBody, (req, res) => {
            const {payload: { sub: userId}, body: { name, email, cif, address, phone } } = req
            
            try {
                createRestaurant(userId, name, email, cif, address, phone)                  
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/restaurant/menu', parseBody, (req, res) => {
            const { payload: { sub: userId }, body: { restaurantId, dishesIds }}   = req

            try {
                createMenu(userId, restaurantId, dishesIds)                    
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/:dishes?', (req, res) => {
            const { query }  = req
            
            try {
                searchPlate(query)
            } catch (error) {
                handleError(error, res)               
            }
        })

        app.get('/:restaurant?', (req, res) => {
            const { query } = req

            try {
                searchRestaurant(query)
            } catch (error) {
                handleError(error, res)
            }
        })

    })

    .catch(error => {
        console.error('Unable to connect mongo', error)
    })