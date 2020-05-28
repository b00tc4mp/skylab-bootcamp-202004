require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const jwt = require('jsonwebtoken')
const { handleError } = require('./helpers')

const app = express()

const parseBody = bodyParser.json()

// users

app.post('/users', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password, error => {
            if (error)
                return handleError(error, res)

            res.status(201).send()
        })
    } catch (error) {
        handleError(error, res)
    }
})

app.post('/users/auth', parseBody, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) return handleError(error, res)

            const token = jwt.sign({ sub: userId }, SECRET, { expiresIn: '1d' })

            res.send({ token })
        })
    } catch (error) {
        handleError(error, res)
    }
})

app.get('/users/:userId?', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve user and send it back
    // TODO if userId is received as a param, the retrieve that user instead of requester user
})

// contacts

app.post('/contacts', parseBody, (req, res) => {
    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        // what if we move all this token stuff to... a middleware? ,)

        const { body: contact } = req

        addContact(userId, contact, (error, contactId) => {
            if (error) return handleError(error, res)

            res.send({ contactId })
        })
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