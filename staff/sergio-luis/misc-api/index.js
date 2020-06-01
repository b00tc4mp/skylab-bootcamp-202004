require('dotenv').config()

const { PORT, SECRET, MONGODB_URL } = process.env

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, unRegister, addToCart,retrieveCart, searchProducts, removeFromCart, placeOrder } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { jwtPromised } = require('./utils')
const { jwtVerifierExtractor } = require('./middlewares')

const {mongo} = require('./data')

mongo.connect(MONGODB_URL)
    .then(connection => {
        console.log('connected to mongo')

        const app = express()

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

        app.post('/carts', parseBody, verifyExtractJwt,(req, res) => {
                    
            try {
                const { payload: { sub: userId} ,body:{productId}} = req
                
                addToCart(userId,productId)
                    .then((result) => {
                        return (typeof result === 'string')? res.status(201).send(result) : res.status(201).send()})
                    .catch((error) => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

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

        app.patch('/carts/remove', parseBody, verifyExtractJwt,(req, res) => {
            try {
                const { payload: { sub: userId} ,body:{productId}} = req
                
                removeFromCart(userId,productId)
                    .then(() => res.status(204).send())
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

        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })

        app.listen(PORT, () => console.log(`${name} ${version} running on port ${PORT}`))

        process.on('SIGINT',()=>{
            connection.close()
                .then(()=> console.log('\ndisconnected'))
                .catch(error => console.log('Could not disconnect'))
                .finally(()=>{
                    console.log(`${name} ${version} stopped`)
                    process.exit()
                })
            })



    })
    .catch(error => console.error('could not connect to mongo',error))






// /////////
// // CONTACTS
// ////////
// //POST -CONTACTS
// app.post('/contacts', parseBody, (req, res) => {
//     try {
//         const  [,token] = req.header('authorization').split(' ') 
//         const { body: contact } = req

//         jwtPromise.verify(token, SECRET)
//             .then(({ sub: userId })=>addContact(userId, contact))
//             .then(contactId=>res.send({ contactId }))
//             .catch(error=>handleError(error,res))
//     } catch (error) {
//         handleError(error,res)
//     }
// })
// // //1590688154405-0.8074044852810498
// //GET -CONTACTS by id
// app.get('/contacts/searchid/:contact', (req, res) => {
//     try {
//         const {params :{contact: contactId}} = req

//         const  [,token] = req.header('authorization').split(' ') 
//       jwtPromise.verify(token, SECRET)
//         .then(({sub:userId})=>listContacts(userId,contactId))
//         .then(contact =>res.send(contact))
//         .catch((error)=>handleError(error,res))    
//     }catch(error) {
//         handleError(error,res)
//     }
// })

// //GET all contact
// app.get('/contacts/all', (req, res) => {
//     try {
//         const  [,token] = req.header('authorization').split(' ') 
//         jwtPromise.verify(token, SECRET)
//             .then(({sub:userId})=>listContacts(userId))
//             .then(contact =>res.send(contact))
//             .catch((error)=>handleError(error,res))    
//     }catch(error) {
//         handleError(error,res)
//     }
// })

// //Search contact by query

// app.get('/contacts/searchQuery/:query', (req, res) => {
//     try {
//         const {params :{query: query}} = req
//         const  [,token] = req.header('authorization').split(' ') 
//         jwtPromise.verify(token, SECRET)
//             .then(({sub: userId})=>searchContacts(userId,query))
//             .then(contacts => res.send(contacts))
//             .catch((error)=>handleError(error,res)) 
//     }catch(error) {
//         handleError(error,res)
//     }
// })

// app.delete("/contacts/remove",parseBody,(req,res)=>{
//     try{
//         const{body: {contactId}} = req
//         const  [,token] = req.header('authorization').split(' ') 

//         debugger
//         jwtPromise.verify(token, SECRET)

//             .then(({sub:userId})=>removeContact(userId , contactId))
//             .then(result=>res.send(result))
//             .catch(error=>handleError(error,res))
//     }catch(error){
//         handleError(error,res)
//     }
// })



// ////////////
// // STICKIESsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
// ///////////
// //POST -stickies
// app.post('/stickies', parseBody, (req, res) => {
//     try {
//         const  [,token] = req.header('authorization').split(' ') 
//         const { body: sticky } = req

//         jwtPromise.verify(token, SECRET)
//         .then(({sub:userId})=>addSticky(userId,sticky))
//         .then(stickyId=> res.send(`Created ${stickyId}`))
//         .catch(error=> handleError(error,res))
//     } catch (error) {
//         handleError(error,res)
//     }
// })
// //GET -stickies by id
// app.get('/stickies/searchId/:stickyId',parseBody, (req, res) => {

//     try {
//         const {params :{stickyId:stickyId}} = req
//         const  [,token] = req.header('authorization').split(' ') 

//         jwtPromise.verify(token, SECRET)
//             .then(({sub:userId})=>listStickies(userId,stickyId))
//             .then(sticky =>res.send(sticky))
//             .catch((error)=>handleError(error,res))    
//     }catch(error) {
//         handleError(error,res)
//     }
// })

// //GET all contact

// app.get('/stickies/all',parseBody, (req, res) => {
//     try {
//     const  [,token] = req.header('authorization').split(' ') 
//     jwtPromise.verify(token, SECRET)
//         .then(({sub:userId})=>listStickies(userId))
//         .then(result => res.send(result))
//         .catch(error => handleError(error,res))
//     }catch(error) {
//         handleError(error,res)
//     }
// })

// //Search contact by query

// app.get('/stickies/searchQuery/:query',parseBody, (req, res) => {
//     try {
//         const {params :{query:query}} = req

//         const  [,token] = req.header('authorization').split(' ') 
//         jwtPromise.verify(token, SECRET)
//             .then(({sub:userId})=>searchStickies(userId,query))
//             .then(result => res.send(result))
//             .catch(error => handleError(error,res))
//     }catch(error) {
//         handleError(error,res)
//     }
// })

// app.delete("/stickies/remove",parseBody,(req,res)=>{
//     try{
//         const  [,token] = req.header('authorization').split(' ') 
//         const{body: {stickyId}} = req
//         jwtPromise.verify(token, SECRET)
//         .then(({sub:userId})=>removeSticky(userId,stickyId))
//         .then(result =>res.send(`Finishimmmm ${result}`))
//         .catch(error => handleError(error,res))
//     }catch(error){
//         handleError(error,res)
//     }
// })