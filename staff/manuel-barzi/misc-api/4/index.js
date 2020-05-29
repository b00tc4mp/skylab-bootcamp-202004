require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { jwtPromised } = require('./utils')
const { jwtVerifierExtractor } = require('./middlewares')

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