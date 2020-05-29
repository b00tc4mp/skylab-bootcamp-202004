require('dotenv').config()

const { PORT, SECRET } = process.env 

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact,listContacts ,searchContacts,unRegister,removeContact,addSticky,listStickies,searchStickies,retrieveSticky,removeSticky} = require('./logic')
const bodyParser = require('body-parser')
const parseBody = bodyParser.json()
const { name, version } = require('./package.json')
const {handleError} = require('./helpers')
const {jwtPromise} = require('./utils')
const app = express()

const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = jwt

/////////
// USERS
////////

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
            .then(id=>jwtPromise.sign({ sub: id }, SECRET, { expiresIn: '1d' }))
            .then(token =>res.send({ token }))
            .catch((error)=>handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
})

app.get("/users/self",(req,res)=>{
    try {
        const  [,token] = req.header('authorization').split(' ') 

        jwtPromise.verify(token,SECRET)
            .then(({ sub: userId })=>retrieveUser(userId))
            .then(user=> res.send(user))
            .catch(error=>handleError(error,res))     
        }catch(error) {
            handleError(error,res)
        }
})

app.get('/users/userId/:user', (req, res) => {
    try {
        const {params :{user: _userId}} = req//Se ha caido, ha terminado la version de prueba
        const  [,token] = req.header('authorization').split(' ')
        
        jwtPromise.verify(token, SECRET)
            .then(()=>retrieveUser(_userId))
            .then(user=>{res.send(user)})
            .catch((error)=>handleError(error,res))
    }catch(error) {
        handleError(error,res)
    }
})


app.delete('/users/remove',parseBody ,(req, res) => {
    try {
        const  [,token] = req.header('authorization').split(' ')
        const{body: {email, password}} = req
        
        jwt.verify(token, SECRET)
            .then(({sub:userId})=> unRegister(userId,email,password))
            .then(message=>{res.send(message)})
            .catch(error=>{handleError(error,res)})
    }catch(error) {
        handleError(error,res)
    }
})


/////////
// CONTACTS
////////
//POST -CONTACTS
app.post('/contacts', parseBody, (req, res) => {
    try {
        const  [,token] = req.header('authorization').split(' ') 
        const { body: contact } = req

        jwtPromise.verify(token, SECRET)
            .then(({ sub: userId })=>addContact(userId, contact))
            .then(contactId=>res.send({ contactId }))
            .catch(error=>handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
})
// //1590688154405-0.8074044852810498
//GET -CONTACTS by id
app.get('/contacts/searchid/:contact', (req, res) => {
    try {
        const {params :{contact: contactId}} = req

        const  [,token] = req.header('authorization').split(' ') 
      jwtPromise.verify(token, SECRET)
        .then(({sub:userId})=>listContacts(userId,contactId))
        .then(contact =>res.send(contact))
        .catch((error)=>handleError(error,res))    
    }catch(error) {
        handleError(error,res)
    }
})

//GET all contact
app.get('/contacts/all', (req, res) => {
    try {
        const  [,token] = req.header('authorization').split(' ') 
        jwtPromise.verify(token, SECRET)
            .then(({sub:userId})=>listContacts(userId))
            .then(contact =>res.send(contact))
            .catch((error)=>handleError(error,res))    
    }catch(error) {
        handleError(error,res)
    }
})

//Search contact by query

app.get('/contacts/searchQuery/:query', (req, res) => {
    try {
        const {params :{query: query}} = req
        const  [,token] = req.header('authorization').split(' ') 
        jwtPromise.verify(token, SECRET)
            .then(({sub: userId})=>searchContacts(userId,query))
            .then(contacts => res.send(contacts))
            .catch((error)=>handleError(error,res)) 
    }catch(error) {
        handleError(error,res)
    }
})

app.delete("/contacts/remove",parseBody,(req,res)=>{
    try{
        const{body: {contactId}} = req
        const  [,token] = req.header('authorization').split(' ') 
        jwtPromise.verify(token, SECRET)
            .then(({sub:userId})=>removeContact(userId , contactId))
            .then(result=>res.send(result))
            .catch(error=>handleError(error,res))
    }catch(error){
        handleError(error,res)
    }
})



////////////
// STICKIESsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
///////////
//POST -stickies
app.post('/stickies', parseBody, (req, res) => {
    try {
        const  [,token] = req.header('authorization').split(' ') 
        const { body: sticky } = req

        jwtPromise.verify(token, SECRET)
        .then(({sub:userId})=>addSticky(userId,sticky))
        .then(stickyId=> res.send(`Created ${stickyId}`))
        .catch(error=> handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
})
//GET -stickies by id
app.get('/stickies/searchId/:stickyId',parseBody, (req, res) => {
    
    try {
        const {params :{stickyId:stickyId}} = req
        const  [,token] = req.header('authorization').split(' ') 
        
        jwtPromise.verify(token, SECRET)
            .then(({sub:userId})=>listStickies(userId,stickyId))
            .then(sticky =>res.send(sticky))
            .catch((error)=>handleError(error,res))    
    }catch(error) {
        handleError(error,res)
    }
})

//GET all contact

app.get('/stickies/all',parseBody, (req, res) => {
    try {
    const  [,token] = req.header('authorization').split(' ') 
    jwtPromise.verify(token, SECRET)
        .then(({sub:userId})=>listStickies(userId))
        .then(result => res.send(result))
        .catch(error => handleError(error,res))
    }catch(error) {
        handleError(error,res)
    }
})

//Search contact by query

app.get('/stickies/searchQuery/:query',parseBody, (req, res) => {
    try {
        const {params :{query:query}} = req
        
        const  [,token] = req.header('authorization').split(' ') 
        jwtPromise.verify(token, SECRET)
            .then(({sub:userId})=>searchStickies(userId,query))
            .then(result => res.send(result))
            .catch(error => handleError(error,res))
    }catch(error) {
        handleError(error,res)
    }
})

app.delete("/stickies/remove",parseBody,(req,res)=>{
    try{
        const  [,token] = req.header('authorization').split(' ') 
        const{body: {stickyId}} = req
        jwtPromise.verify(token, SECRET)
        .then(({sub:userId})=>removeSticky(userId,stickyId))
        .then(result =>res.send(`Finishimmmm ${result}`))
        .catch(error => handleError(error,res))
    }catch(error){
        handleError(error,res)
    }
})



app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})

app.listen(PORT, () => console.log(`${name} ${version} running on port ${PORT}`))