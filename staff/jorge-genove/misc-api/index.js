require('dotenv').config()

const {argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET, MONGODB_URL} } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, unregisterUser, createProduct,addToCart,searchProduct } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { jwtPromised } = require('../misc-commons/utils')
const { jwtVerifierExtractor } = require('./middlewares')
const { handleError } = require('./helpers')

mongo.connect(MONGODB_URL)
    
    const app = express()

    const parseBody = bodyParser.json()

    const verifyExtractJwt = jwtVerifierExtractor(SECRET,handleError)

    // users

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
        const { body: { email, password } } = req

        try {
            authenticateUser(email, password)
               
                .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: '1d' }))
                .then(token => res.send({token}))
                .catch(error => handleError(error,res))
                

        } catch (error) {
            handleError(error, res)
        }
    })

    app.get('/users/:userId?',verifyExtractJwt, (req, res) => {
        
        try {
            const {payload: {sub: userId}, params: {userId: otherUserId} } = req

           
            retrieveUser(otherUserId || userId)
                .then(user => res.send(user))
                .catch(error => handleError(error, res))

        } catch (error) {
            handleError(error, res)

        }
    })


  
    app.delete('/users/delete',verifyExtractJwt, (req, res) => {
        
        try {
           
            const {payload: {sub: userId}} = req

            unregisterUser(userId)
                .then(() => res.status(204).send())
                .catch(error => handleError(error, res))

        } catch (error) {
            handleError(error, res)
        }
    })



    app.patch('/users/update', parseBody, (req, res) => {

        try {
            const [, token] = req.header('authorization').split(' ')

            const { sub: userId } = jwt.verify(token, SECRET)

            const { body } = req
    debugger
            update(userId, body)
                .then(() => res.status(201).send())
                .catch(error => handleError(error,res))
                // if (error) return res.status(403).json({ error: error.message })
                // res.json({ "message": "user updated" })  //TODO
            
        } catch (error) {
            handleError(error, res)
        }
    })

    
app.post('/products',  parseBody, (req, res) => {
    const { body :{ name, description, price, url} } = req

    try {
        createProduct(name, description, price, url)
            .then(() => res.status(204).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
})

app.get('/products/:query?', verifyExtractJwt, (req, res) => {
    
    try {
    const {params : {query : searchQuery} } = req
    searchProduct(searchQuery)
        .then((product) => res.send(product))
        .catch(error => handleError(error,res))
}catch (error) {
    handleError(error, res)      
    }
})

app.post('/carts', verifyExtractJwt, parseBody, (req, res) => {
    
    try {
        const {payload: {sub: userId}} = req
        const {body :{productId}} = req
    
        addToCart(userId, productId)
            .then(()=> res.status(204).send())
            .catch(error => handleError(error,res))
    }catch(error) {
        handleError(error,res)
    }
})
    // other

    app.get('*', (req, res) => {
        res.status(404).send('Not Found :(')
    })

    app.listen(PORT, () => console.log(`${name} ${version} running in ${PORT}`))