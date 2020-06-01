require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, createProduct, addTocart, unregisterUser } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { jwtPromised } = require('./utils')
const { jwtVerifierExtractor } = require('./middlewares')
const { mongo } = require('./data')

mongo.connect(MONGODB_URL)
    .then(connection => {
        console.log('connected to mongo')

        const app = express()

        const parseBody =bodyParser.json()

        const verifyExtractJwt =jwtVerifierExtractor(SECRET, handleError)
        
        // users

        app.post('/users', parseBody, (req, res) => {
            const { body: { name, surname, email, password } } = req
        
            try {
                registerUser(name, surname, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))
        
            } catch (error) {
                handleError(error, res)
            }
        })
        
        app.post('/users/auth', parseBody, (req, res) => {
            const { body: { email, password } } = req
        
            try {
                authenticateUser(email, password)
                    .then(userId => jwtPromised({ sub: userId }, SECRET, { expiresIn: '1d' }))
                    .then(token => res.send({ token }))
                    .catch(error => handleError(error, res))
        
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/users/:userId?', verifyExtractJwt, (req, res) => {
        
            try {
                const {payload: { sub: userId }, params: { userId: otherUserId } } = req
                
                retrieveUser(otherUserId || userId) 
                    .then(user => res.send(user))
                    .catch(error => handleError(error, res))
        
            } catch (error) {
                handleError(error, res)
            }
        
        })

        app.delete('/users', verifyExtractJwt, parseBody, (req, res) => {
            try {
                const { sub: userId } = req.payload
                
                unregisterUser(userId)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        // Products

        app.post('/products', parseBody, (req, res) => {
            const { body: { name, description, price, url } } = req
        
            try {
                createProduct(name, description, price, url)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/products/cart', verifyExtractJwt, parseBody, (req, res) => {
            const {body: {productId} } = req

            const { payload: { sub: userId } } = req

            try {
                addTocart(userId, productId)
                    .then(() => res.status(201).send('The product is added.'))
                    .catch(error => handleError(error, res))
        
            } catch (error) {
                handleError(error, res)
            }
        })

        // other
        
        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })

        app.listen(PORT, () => console.log(`${name} ${version} running on port ${PORT}`))

        process.on('SIGINT', () => {
            connection.close()
                .then(() => console.log('\ndisconnected mongo'))
                .catch(error => console.error('could not disconnect from mongo', error))
                .finally(() => {
                    console.log(`${name} ${version} stopped`)

                    process.exit()
                })
        })

    })

    .catch(error => {
        debugger // WTF! why is not reaching this point when mongodb server is off!? 🤬

        console.error('could not connect to mongo', error)
    })