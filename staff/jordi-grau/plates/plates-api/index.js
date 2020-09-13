require('dotenv').config()
const { argv: [ , , PORT_CLI], env: {PORT: PORT_ENV, JWT_SECRET, MONGODB_URL} } = process
const PORT = PORT_CLI || PORT_ENV || 8080
const express = require ('express')
const { registerUser, authenticateUser, createRestaurant, createMenu, searchPlate, searchRestaurant, retrieveUser, retrieveRestaurant, addToFollowedDishes, createDish } = require('plates-server-logic')
const bodyParser = require('body-parser')
const { handleError } = require('./helpers')
const { utils: {  jwtPromised }} = require('plates-commons')
const { jwtVerifierExtractor, cors } = require('./middlewares')
const { name, version } = require('./package.json')
const { mongoose }  = require('plates-data')

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log(`Connected to ${MONGODB_URL}`)

        const app = express()

        const parseBody = bodyParser()

        const verifyExtractJwt =  jwtVerifierExtractor(JWT_SECRET, handleError)

        app.use(cors) 


        app.post('/users', parseBody, (req, res) =>{
             
            const { body: { name, surname, email, password }} = req

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
                    .then(userId => jwtPromised.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1d' }))
                    .then(token => res.send({ token }))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)    
            }
        })

        app.post('/users/restaurant', verifyExtractJwt, parseBody, (req, res) => {

            const {payload: { sub: userId}, body: { name, email, cif, address, phone } } = req
             
            try {
                createRestaurant(userId, name, email, cif, address, phone)    
                .then(()=> res.status(201).end()) 
                .catch(error => handleError(error, res))             
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/restaurant/menu', verifyExtractJwt, parseBody, (req, res) => {
            const { payload: { sub: userId }, body: { restaurantId, dishesIds }}   = req

            try {
                createMenu(userId, restaurantId, dishesIds)  
                    .then(() => res.status(201).end())
                    .catch(error => handleError(error, res))                  
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/search/dishes?', (req, res) => {
            const { query:{query} }   = req
            
            try {
                searchPlate(query)
                    .then((dish) => res.status(200).json(dish))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)               
            }
        })
 
        app.get('/search/restaurant?', (req, res) => {
            const { query:{query} }   = req
            
            try {
                searchRestaurant(query)
                    .then((restaurants) => res.status(200).json(restaurants))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/users', verifyExtractJwt, (req, res) => {
            const { payload: {sub: userId} } = req
             
            try {
                retrieveUser(userId)
                    .then(user => res.status(200).json(user))
                    .catch(error => handleError(error,res))
            } catch (error) {
                handleError(error, res)
            }
        })



        app.get('/restaurant/:restaurantId',(req, res) => {
            const { params: {restaurantId} } = req
             
            try {
                retrieveRestaurant(restaurantId)
                    .then(restaurants => res.status(200).json(restaurants))
                    .catch(error => handleError(error,res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/users/dishes', verifyExtractJwt, parseBody, (req, res) => {
            const { payload: { sub: userId }, body: {  dishId }}   = req
            
            try {
                addToFollowedDishes(dishId, userId)
                .then(()=> res.status(201).end())
                .catch(error => handleError(error,res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/restaurant/dishes', verifyExtractJwt, parseBody, (req, res) => {
            const {  body: {  restaurantId, name, position, tags, price }}   = req
          
            try {
                createDish(restaurantId, name, position, tags, price)
                .then(()=> res.status(201).end())
                .catch(error => handleError(error,res))
            } catch (error) {
                handleError(error, res)
            }
        })

        // app.post('/restauant/menu', verifyExtractJwt, parseBody, (req, res)=> {
        //     const { payload: { sub: userId}, body: { restaurantId, dishId}} = req

        //     try {
        //         createMenu(userId, restaurantId, dishId)
        //         .then(() => res.status(201).end())
        //         .catch(error => handleError(error, res))
        //     } catch (error) {
        //         handleError(error, res)
        //     }
        // })





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
        console.error('Unable to connect mongo', error)
    })