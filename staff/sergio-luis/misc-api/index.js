require('dotenv').config()

const { PORT, SECRET, MONGODB_URL } = process.env

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, unRegister,retrieveCart, searchProducts, placeOrder ,updateCart} = require('../misc-server-logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { jwtPromised } = require('misc-commons/utils')
const { jwtVerifierExtractor , cors} = require('./middlewares')

const {mongoose} = require('misc-data')

mongoose.connect(MONGODB_URL)
    .then(()=> {
        console.log('connected to mongo')

        const app = express()

        app.use(cors)

        const parseBody = bodyParser.json()

        const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)
////////////USERS////////////////////////////////////////
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
                    .then(id => jwtPromised.sign({ sub: id }, SECRET, { expiresIn: '1d' }))
                    .then(token => res.status(200).send({ token }))
                    .catch((error) => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/users/userId/:user?', verifyExtractJwt,(req, res) => {
            
            try {
                debugger
                const { params: { user: otherUserId },payload: { sub: userId} } = req
                
                retrieveUser(otherUserId || userId)
                    .then(user => { res.status(200).send(user) })
                    .catch((error) => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })


        app.delete('/users/remove', parseBody, verifyExtractJwt, (req, res) => {
            try {
                const { body: { email, password }, payload: { sub: userId} } = req

                unRegister(userId, email, password)
                    .then(message => { res.status(204).send(message) })
                    .catch(error => { handleError(error, res) })
            } catch (error) {
                handleError(error, res)
            }
        })
//////////////////////////////////////////////////////////
//////////// CART ////////////////////////////////////////
/////////////////////////////////////////////////////////

  

        app.get('/carts',verifyExtractJwt,(req,res)=>{
            try {
                const {payload: { sub: userId} } = req
                
                retrieveCart(userId)
                    .then(cart => res.status(200).send(cart))
                    .catch((error) => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/products/:query?', parseBody, verifyExtractJwt,(req,res)=>{
            try {
                const {payload: { sub: userId} , params:{query:_query}} = req
                
                searchProducts(userId,_query)
                    .then(results => res.status(200).send(results))
                    .catch((error) => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

     
        app.post('/orders', parseBody, verifyExtractJwt,(req, res) => {
            try {
                const { payload: { sub: userId}, body: {cartId}} = req

                placeOrder(userId, cartId)
                    .then(() => res.status(201).send('Bought!'))
                    .catch((error) => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

// updateCart
        app.patch('/updateCart', verifyExtractJwt, parseBody, (req, res) => {
            try {
                const { payload: { sub: userId }, body: {productId , quantity} } = req

                    updateCart(userId, productId, quantity)
                        .then(() => res.status(204).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
        })

        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })

        app.listen(PORT, () => console.log(`${name} ${version} running on port ${PORT}`))

        process.on('SIGINT',()=>{
            mongoose.disconnect()
                .then(()=> console.log('\ndisconnected mongo'))
                .catch(error => console.log('Could not disconnect from mongo',error))
                .finally(()=>{
                    console.log(`${name} ${version} stopped`)
                    process.exit()
                })
            })



    })
    .catch(error => console.error('could not connect to mongo',error))

