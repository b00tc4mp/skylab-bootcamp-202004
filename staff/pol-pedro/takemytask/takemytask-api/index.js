require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { registerUser} = require('takemytask-server-logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { utils: { jwtPromised } } = require('takemytask-commons')
const { jwtVerifierExtractor, cors } = require('./middlewares')
const { mongoose } = require('takemytask-data')

console.debug('starting server')

try {
    console.debug('connecting to database')

    mongoose.connect(MONGODB_URL)
        .then(() => {
            console.info(`connected to database ${MONGODB_URL}`)

            const app = express()

            const parseBody = bodyParser.json()

            const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

            app.use(cors)

            // users

            app.post('/users', parseBody, (req, res) => {
                const { body: { name, surname, email, password, adress } } = req

                try {
                    registerUser(name, surname, email, password, adress)
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

            app.get('*', (req, res) => {
                res.status(404).send('Not Found :(')
            })

            app.listen(PORT, () => console.info(`server ${name} ${version} running on port ${PORT}`))

            let interrupted = false

            process.on('SIGINT', () => {
                if (!interrupted) {
                    interrupted = true

                    console.debug('stopping server')

                    console.debug('disconnecting database')

                    mongoose.disconnect()
                        .then(() => console.info('disconnected database'))
                        .catch(error => file.error('could not disconnect from mongo', error))
                        .finally(() => {
                            console.info(`server ${name} ${version} stopped`)

                            setTimeout(() => {
                                file.close()

                                setTimeout(() => {
                                    process.exit()
                                }, 500)
                            }, 500)
                        })
                }
            })
        })
        .catch(error => {
            file.error('could not connect to mongo', error)
        })
} catch (error) {
    file.error(error)
}