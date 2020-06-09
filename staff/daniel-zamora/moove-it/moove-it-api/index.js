 require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, JWT_SECRET: SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { register, login, retrieveUser, searchUsers, unregisterUser, updateUser, updateCart } = require('moove-it-client-logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { mongoose } = require('moove-it-data')
const { jwtVerifierExtractor, cors} = require('./middlewares')
const {utils: { jwtPromised }} = require('moove-it-commons')

// users
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('mongoose listening')
        
        const app = express()
        
        const parseBody = bodyParser.json()

        const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)


        app.use(cors)


        })

        // app.get('/users/search/q=:query', verifyExtractJwt, (req, res) => { debugger
        //     try {
        //         const { params: { query }, payload: {sub: id} } = req

        //         const queryObject = {}
        //         query.split('&').forEach(element => {
        //             const [key, value] = element.split('=')
        //             queryObject[key] = value
        //         })

        //         searchUsers(id, queryObject)
        //             .then(users => res.status(200).send(users))
        //             .catch(error => handleError(error, res))

        //     } catch (error) {
        //         handleError(error, res)
        //     }
        // })

        // app.delete('/users/delete', parseBody, verifyExtractJwt, (req, res) => {

        //     try {
        //         const { payload: {sub: id} } = req

        //         const { body: { email, password } } = req

        //         unregisterUser(email, password, id)
        //             .then(()=>res.status(204).send())
        //             .catch(error => handleError(error, res))

        //     } catch (error) {
        //         handleError(error, res)
        //     }
        // })


        // app.patch('/users/cart', parseBody, verifyExtractJwt, (req, res) => {
        //     try {
        //         const { payload: {sub: id} } = req

        //         const { body: { productId, quantity } } = req

        //         updateCart(id, productId, quantity) 
        //             .then(()=> res.status(204).send())
        //             .catch(error => handleError(error, res))

        //     } catch (error) {
        //         handleError(error, res)
        //     }
        // })


        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })

        app.listen(8080, () => console.log(`${name} ${version} running in ${PORT}`))
    