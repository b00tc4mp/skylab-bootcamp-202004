const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')

const app = express()

const parseBody = bodyParser.json()

// users

app.post('/users', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password, error => {
            if (error) return res.status(409).json({ error: error.message })

            res.status(201).send()
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.post('/users/auth', parseBody, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ userId })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.get('/users/:userId?', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve user and send it back
    // TODO if userId is received as a param, the retrieve that user instead of requester user
})

// contacts

app.post('/contacts', parseBody, (req, res) => {
    const [, userId] = req.header('authorization').split(' ')

    const { body: contact } = req

    try {
        addContact(userId, contact, (error, contactId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ contactId })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.get('/contacts/:contactId', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve contact by contact id param and send it back
})

// other

app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})

app.listen(8080, () => console.log(`${name} ${version} running`))