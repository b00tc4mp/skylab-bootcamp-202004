require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, JWT_SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, createCategory, createChallenge, retrieveChallenges, retrieveCategories, retrieveCategory, savePossibleSolution, deleteCategory, deleteChallenge } = require('code-this-server-logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { utils : {jwtPromised} } = require('code-this-commons')
const { jwtVerifierExtractor, cors } = require('./middlewares')
const { mongoose } = require('code-this-data')
// const challenge = require('code-this-data/models/challenge')
// const category = require('code-this-data/models/category')

mongoose.connect(MONGODB_URL)
    .then(()=> {
        console.log('connected to mongo')

        const app = express()

        const parseBody = bodyParser.json()
        const verifyExtractJwt = jwtVerifierExtractor(JWT_SECRET, handleError)
        // users
        app.use(cors)
        app.post('/users', parseBody, (req, res) => {
            const { body: { name, email, password } } = req


            try {
                registerUser(name, email, password)
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
                    .then(userId => jwtPromised.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1d' }))
                    .then(token => res.send({ token }))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/challenge', parseBody, (req, res) => {
            const { body: { description, difficulty, initialCode, tests } } = req

            try {
                createChallenge(description, difficulty, tests, initialCode)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/category', parseBody, (req, res) => {
            const { body: { name, challenges } } = req
            try {
                createCategory(name, challenges)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
                console.log(error)
            }
        })

        app.delete('/deletecategory/:categoryId', parseBody, (req, res)=>{
            try {
                const { params: {categoryId}} = req
                deleteCategory(categoryId)
                .then((response) => res.send(response))
                .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
                console.log(error)
            }
          })

          app.delete('/deletechallenge/:challengeId', parseBody, (req, res)=>{
            try {
                const { params: {challengeId}} = req
                deleteChallenge(challengeId)
                .then((response) => res.send(response))
                .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
                console.log(error)
            }
          })

        app.get('/challenges', (req, res) => {

            try {
                retrieveChallenges()
                    .then((challenges) => res.send(challenges))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
 
        })

        app.get('/categories', (req, res) => {

            try {
                retrieveCategories()
                    .then((categories) => res.send(categories))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
 
        })

        app.get('/category/:categoryName', (req, res) => {
            const { params: {categoryName}} = req

            try {
                retrieveCategory(categoryName)
                    .then((category) => res.send(category))
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

        app.patch('/challenge', parseBody, (req, res) => {
            try {
                const { body: { challengeId, solution, userId } } = req
                savePossibleSolution(userId, challengeId, solution)
                    .then( challenge=> res.send(challenge))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })

        app.listen(PORT, () => console.log(`${name} ${version} running on port ${PORT}`))

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