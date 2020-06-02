require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact } = require('./logic')
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

        const parseBody = bodyParser.json()

        const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

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
                    .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: '1d' }))
                    .then(token => res.send({ token }))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/users/:userId?', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { userId: otherUserId } } = req

                retrieveUser(otherUserId || userId)
                    .then(user => res.send(user))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        // contacts

        app.post('/contacts', verifyExtractJwt, parseBody, (req, res) => {
            try {
                const { payload: { sub: userId }, body: contact } = req

                new Promise((resolve, reject) => {
                    addContact(userId, contact, (error, contactId) => {
                        if (error) return reject(error)

                        resolve(contactId)
                    })
                })
                    .then(contactId => res.send({ contactId }))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/contacts/:contactId', (req, res) => {
            // TODO extract userId from authorization (bearer token) then retrieve contact by contact id param and send it back
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