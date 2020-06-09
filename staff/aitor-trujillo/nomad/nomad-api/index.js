require('dotenv').config()

const { PORT, MONGODB_URL, SECRET } = process.env

const path = require('path')
const bodyParser = require('body-parser')
const { registerUser, authenticateUser, createWorkspace, retrieveWorkspaceById } = require('nomad-server-logic')
const { mongoose } = require('nomad-data')
const { jwtVerifierExtractor, cors } = require('./middlewares')
const { handleError } = require('./helpers')
const { utils: { jwtPromised } } = require('nomad-commons')

const express = require('express')


mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`connected to database ${MONGODB_URL}`)

        const app = express()

        const parseBody = bodyParser.json()

        const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

        app.use(cors)

        // USERS ============================

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

        // WORKSPACES =======================

        app.post('/workspaces', parseBody, verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, body: workspace } = req

                createWorkspace(userId, workspace)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/workspaces/:workspaceId', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { workspaceId } } = req

                retrieveWorkspaceById(workspaceId)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/workspaces/search?q=:query', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { query } } = req

                searchWorkspaces(query)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })


        // OTHERS =========================

        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })

        app.listen(PORT, () => console.log(`server running on port ${PORT}`))

        process.on('SIGINT', () => {
            mongoose.disconnect()
                .then(() => console.log('\ndisconnected mongo'))
                .catch(error => console.error('could not disconnect from mongo', error))
                .finally(() => {
                    console.log(`mongo stopped`)

                    process.exit()
                })
        })
    })
    .catch(error => {
        console.error('could not connect to mongo', error)
    })



