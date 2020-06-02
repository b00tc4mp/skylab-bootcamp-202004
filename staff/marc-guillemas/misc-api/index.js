require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, JWT_SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, searchUsers, unregisterUser, updateUser, updateCart, placeOrder, addProduct, searchProducts } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { mongo } = require('./data')
const { jwtVerifierExtractor } = require('./middlewares')
const { utils: {jwtPromised} } = require('misc-commons')

const app = express()
const parseBody = bodyParser.json()

// users

mongo.connect(MONGODB_URL)
    .then(connection => {

        const verifyToken = jwtVerifierExtractor(JWT_SECRET, handleError)


        app.post('/users', parseBody, (req, res) => {debugger
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
            debugger
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

        app.get('/users/id=:userId?', verifyToken, (req, res) => {

            try {

                const { payload: { sub: userId }, params: { userId: otherUserId } } = req

                retrieveUser(otherUserId || userId)
                    .then(user => res.send(user))
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)

            }
        })


        app.get('/users/search', verifyToken, (req, res) => {

            try {

                const { payload: { sub: userId }, query: { q } } = req

                searchUsers(userId, q)
                    .then(users => {
                        //console.log(users)
                        res.send(users)
                    })
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
            }
        })


        app.delete('/users/delete', parseBody, (req, res) => {
            debugger
            try {
                const { payload: { sub: userId }, params: { userId: otherUserId } } = req


                const { body: { email, password } } = req

                unregisterUser(email, password, userId)
                    .then(() => res.status(204).send())
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
            }
        })

        app.patch('/users/update', verifyToken, parseBody, (req, res) => {

            try {

                const { payload: { sub: userId }, body } = req


                updateUser(userId, body)
                    .then((message) => res.status(201).send({ message: message }))
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
            }
        })

        // cart

        // app.post('/cart/add', verifyToken, parseBody, (req, res) => {

        //     const { payload: { sub: userId }, body: { id: productId } } = req

        //     addToCart(userId, productId)
        //         .then(message => res.status(201).send({ message: message }))
        //         .catch(error => handleError(error, res))

        // })

        // app.get('/cart', verifyToken, (req, res) => {
        //     const { payload: { sub: userId } } = req
        //     retrieveCart(userId)
        //         .then(items => res.status(201).send({ cart: items }))
        //         .catch(error => handleError(error, res))
        // })



        app.post('/product',parseBody, (req, res) => {

            const { body: product } = req

            addProduct(product)
                .then(() => res.status(201).send())

        })

        // app.get('/product/q=:product?', verifyToken, (req,res) => {

        //     const { params: { product: query } } = req
        //     searchProducts(query)
        //         .then(productList => {
        //             console.log(productList)
        //             res.status(201).send(productList)
        //         })
        //         .catch(error => handleError(error, res))

        // })

        app.post('/cart', verifyToken, parseBody, (req,res) => {
            debugger
            const {payload: {sub: userId}, body: {productId, qty}} = req
            if(qty === undefined) qty = 1
                updateCart(userId, productId, qty)
                    .then(()=> res.status(201).send())
                    .catch(error => handleError(error, res))
        })

        //  PLACE ORDER 

        app.get('/order', verifyToken, (req, res) => {debugger
            const {payload: {sub: userId}} = req

            placeOrder(userId)
                .then(order => res.status(201).send(order))
                .catch(error => handleError(error,res))
        })


        app.listen(PORT, () => console.log(`${name} ${version} running in ${PORT}`))

        process.on('SIGINT', () => {   //TODO
            connection.close()
                .then(() => console.log('\ndisconnected'))
                .catch(error => console.error('could not disconnect from mongo', error))
                .finally(() => {
                    console.log(`${name} ${version} stopped`)

                    process.exit()
                })
        })
    })

    .catch(error => {
        console.error('coulud not connect to mongo', error)
    }) 