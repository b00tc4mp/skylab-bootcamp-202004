const express = require('express')
require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser, updateCart, retrieveCart, searchProducts, placeOrder } = require('misc-server-logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { utils: { jwtPromised } } = require('misc-commons')
const { jwtVerifierExtractor, cors } = require('./middlewares')
const { mongoose } = require('misc-data')

mongoose.connect(MONGODB_URL)
    .then(() => {
        const app = express()

        const parseBody = bodyParser.json()

        const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

        app.use(cors)
        
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

        app.delete('/users/', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId } } = req

                unregisterUser(userId)
                    .then(() => res.status(200).send())
                    .catch(error => handleError(error, res))
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

        app.get('/users/:userId?', verifyExtractJwt, (req, res) => {
            if (req.params.userId) {
                const { userId } = req.params

                try {
                    retrieveUser(userId)
                        .then(user => res.send(user))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            } else {
                try {
                    const { payload: { sub: userId } } = req

                    retrieveUser(userId)
                        .then(user => res.send(user))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            }
        })

        app.patch('/update', parseBody, verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, body } = req

                updateUser(userId, body)
                    .then(() => res.status(200).send())
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/cart', parseBody, verifyExtractJwt, (req, res) => {debugger
        
            try {
                const { payload: { sub: userId }, body: { productId, quantity } } = req

                updateCart(userId, productId, quantity)
                    .then(() => res.status(200).send())
                    .catch(error => handleError(error, res))
                debugger
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/cart', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId } } = req

                retrieveCart(userId)
                    .then(results => res.status(200).send(results))
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/search-products', (req, res) => {
            try {
                const query = req.query.q

                searchProducts(query)
                    .then(results => res.status(200).send(results))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)

            }
        })

        app.post('/order', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId } } = req

                placeOrder(userId)
                    .then(() => res.status(200).send())
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })

        app.listen(PORT, () => console.log(`${name} ${version} running`))

        process.on('SIGINT', () => {
            mongoose.disconnect()
                .then(() => console.log('\ndisconnected mongo'))
                .catch(error => console.error('could not disconnect from mongo', error))
                .finally(() => {
                    console.log(`${name} ${version} stopped`)

                    process.exit()
                })
        })
    })
    .catch(error => {
        console.error('could not connect to mongo', error)
    })