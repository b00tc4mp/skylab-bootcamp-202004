require('dotenv').config()
const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, JWT_SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080
const express = require('express')
/*const { registerUser, authenticateUser, retrieveUser, unRegister,
        addProduct,retrieveProduct,removeProduct,
        addCart, addToCart,retrieveCart,removeFromCart,removeCart,
        makeOrder,retrieveOrder, retrieveAllOrders} = require('misc-server-logic') */
const {registerUser,authenticateUser,retrieveUser,unRegister}=require("misc-server-logic")
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { jwtPromise } = require('misc-commons/utils')
const {  jwtVerifierExtractor,cors} = require('./middlewares')
const { mongoose } = require('misc-data')

mongoose.connect(MONGODB_URL)
    .then(connection=>{
        console.log("Connection to mongo successfull")
        const app=express()
        const parseBody=bodyParser.json()
        const verifyExtractJwT= jwtVerifierExtractor(JWT_SECRET,handleError)
        
        app.use(cors)

        /////////
        //USERS//
        /////////
        app.post('/users', parseBody, (req, res) => {
            const { body: { name, surname, email, password } } = req
        
            try {
                registerUser(name, surname, email, password)
                    .then(()=> res.status(201).send() )
                    .catch(error=>handleError(error,res))
                
            } catch (error) {
                handleError(error,res)
            }
        })
        app.post('/users/auth', parseBody, (req, res) => {
            const { body: { email, password } } = req
        
            try {
                authenticateUser(email, password)
                    .then(id=>jwtPromise.sign({ sub: id }, JWT_SECRET, { expiresIn: '1d' }))
                    .then(token =>res.send({ token }))
                    .catch((error)=>handleError(error,res))
            } catch (error) {
                handleError(error,res)
            }
        })
        app.get("/users/self",verifyExtractJwT,(req,res)=>{
            try {
                const { payload: { sub: userId }}=req
                retrieveUser(userId)
                    .then(user=>res.send(user))
                    .catch(error=>handleError(error,res))
                }catch(error) {
                    handleError(error,res)
                }
        })
        app.get('/users/userId/:user',verifyExtractJwT, (req, res) => {
            try {
                const {params :{user: userId}} = req
                
                retrieveUser(userId)
                    .then(user=>res.send(user))
                    .catch(error=>handleError(error,res))
                }catch(error) {
                    handleError(error,res)
                }
        })
        app.delete('/users/remove',verifyExtractJwT,parseBody ,(req, res) => {
            try {
                const { payload: { sub: userId }, body: {email, password} } = req
                unRegister(userId,email,password)
                    .then(message=>{res.send(message)})
            }catch(error) {
                handleError(error,res)
            }
        })
        ////////////
        //PRODUCTS//
        ////////////
        app.get("/products",verifyExtractJwT,parseBody,(req,res)=>{
            try{
                const {body: {name,description,price,url}}= req
                const product={name,description,price,url}
                addProduct(product)
                    .then(res.status(201).send())  
                    .catch(error=>handleError(error,res))          
            }catch(error){
                handleError(error,res)
            }
        })
        app.get("/products/productId/:product",verifyExtractJwT,(req,res)=>{
            try{
                const {params :{product: productId}} = req
                retrieveProduct(productId)
                    .then((product)=>res.send(product))
                    .catch(error=>handleError(error,res)) 
            }catch(error){
                handleError(error,res)
            }
        })
        app.delete("/products/remove",verifyExtractJwT,parseBody,(req,res)=>{
            try {
                const { body: {productId} } = req
                removeProduct(productId)
                    .then(message=>{res.send(message)})
                    .catch(error=>handleError(error,res))
            }catch(error) {
                handleError(error,res)
            }
        })
        /////////
        //CARTS//
        /////////
        app.post("/carts",verifyExtractJwT,(req,res)=>{
            try{
                const { payload: { sub: userId }}=req
                addCart(userId)
                    .then(res.status(201).send()) 
                    .catch(error=>handleError(error,res))
            }catch(error){
                handleError(error,res)
            }
        })
        app.post("/carts/add-to-cart",verifyExtractJwT,parseBody,(req,res)=>{
            try{
                const { payload: { sub: userId }, body: {productId} } = req
                addToCart(userId,productId)
                    .then(res.status(205).send()) 
                    .catch(error=>handleError(error,res))
            }catch(error){
                handleError(error,res)
            }
        })
        app.get("/carts",verifyExtractJwT,(req,res)=>{
            try{
                const{payload:{sub:userId}}=req
                retrieveCart(userId)
                    .then(cart=>res.send(cart))
                    .catch(error=>handleError(error,res))
            }catch(error){
                handleError(error,res)
            }
        })
        app.delete("/carts/remove-from-cart",verifyExtractJwT,parseBody,(req,res)=>{
            try{
                const { payload: { sub: userId }, body: {productId} } = req
                removeFromCart(userId,productId)
                    .then(res.status(205).send()) 
                    .catch(error=>handleError(error,res))
            }catch(error){
                handleError(error,res)
            }
        })
        app.delete("/carts",verifyExtractJwT,(req,res)=>{
            try{
                const { payload: { sub: userId }} = req
                removeCart(userId)
                    .then(message=>res.send(message))
                    .catch(error=>handleError(error,res))
            }catch(error){
                handleError(error,res)
            }
        })
        //////////
        //ORDERS//
        //////////
        app.post("/orders",verifyExtractJwT,(req,res)=>{
            try{
                const{payload:{sub:userId}} = req
                makeOrder(userId)
                    .then(order=>{res.status(205).send(order.ops)})
                    .catch(error=>handleError(error,res))
            }catch(error){
                handleError(error,res)
            }
        })
        app.get("/orders/retrieve/:order",verifyExtractJwT,(req,res)=>{
            try{
                const{payload:{sub:userId},params :{order: orderId}} = req
                retrieveOrder(userId,orderId)
                    .then(order=>res.send(order))
                    .catch(error=>handleError(error,res))

            }catch(error){
                handleError(error,res)
            }
        })
        app.get("/orders/all",verifyExtractJwT,(req,res)=>{
            try{
                const{payload:{sub:userId}} = req
                retrieveAllOrders(userId)
                    .then(orders=>res.send(orders))
                    .catch(error=>handleError(error,res))
            }catch(error){
                handleError(error,res)
            }
        })
        
        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })
        app.listen(PORT, () => console.log(`${name} ${version} running on port ${PORT}`))
        process.on("SIGINT",()=>{
            connection.close()
                .then(()=>{console.log("\n disconnecting mongo")})
                .catch(error=>{console.error("could not disconnect from mongo",error)})
                .finally(()=>{console.log(`${name} ${version} stopped`); process.exit()})
        })
    })
.catch(error=>{console.log("could not connect to mongo",error)})