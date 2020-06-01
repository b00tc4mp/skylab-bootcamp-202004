require('dotenv').config()

const {PORT, SECRET} = process.env


const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact, searchContact, addSticky } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const {handleError} = require('./helpers')
const app = express()

const parseBody = bodyParser.json()

const jwt = require('jsonwebtoken')

const {JsonWebTokenError} = jwt
const { jwtPromised } = require('./utils')


// users

app.post('/users', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req
    debugger
    try {
        registerUser(name, surname, email, password)
            .then(() => res.status(201).send() )
            .catch(error => handleError(error, res))
        } catch (error) {
            handleError(error, res)
    }
})

app.post('/users/auth', parseBody, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
        .then(userId => jwtPromised.sign({sub: userId}, SECRET, {expiresIn: '1d'}))
        .then(token => res.send({ token }))
        .catch(error => handleError(error, res))            
    } catch (error) {
        handleError(error, res)
    }
})

app.get('/users/:userId?', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve user and send it back
    // TODO if userId is received as a param, the retrieve that user instead of requester user
    debugger
    try{
        if(req.params.userId) {
            const {userId} = req.params
            
            retrieveUser(userId)
                .then((user) => res.send( user ))
                .catch(error => handleError(error,res))
        }else {
            const [, token] = req.header('authorization').split(' ')
            const {sub : userId} = jwtPromised.verify(token, SECRET)
            
            retrieveUser(userId)
                .then((user) => res.send( user ))
                .catch(error => handleError(error,res))
        }
    }catch(error) {
        handleError(error,res)
    }
    
})


// contacts

app.post('/contacts', parseBody, (req, res) => {
    try{
        const [,token] = req.header('authorization').split(' ')

        const {sub: userId} = jwt.verify(token, SECRET)

        const { body: contact } = req

        addContact(userId, contact, (error, contactId) => {
            if (error) return res.status(401).json({ error: error.message })
            
            res.send({ contactId })
        })
    }catch(error) {
        if(error instanceof JsonWebTokenError)
            res.status(401)
        else
            res.status(406)
            res.json({error: error.message})
    }
})

app.get('/contacts/:contactId', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve contact by contact id param and send it back
    const [,token] = req.header('authorization').split(' ')

    const {sub: userId} = jwt.verify(token, SECRET)

    const {contactId} = req.params

    try {
        searchContact(userId, contactId, (error, contact) => {
            if(error) return res.status(404).json({error: error.message})
            res.send({contact})
        })
    } catch (error) {
        res.status(406).json({error: error.message})   
    }
})

app.post('/users/stickies', parseBody, (req, res) =>{
    debugger
    const [,token] = req.header('authorization').split(' ')
    const {sub: userId} = jwt.verify(token, SECRET)
    const { body: sticky} = req
    
    try {
        addSticky(userId, sticky, (error, stickyId)=>{
            if(error) return res.status(404).json({error: error.message})
            res.send(stickyId)
        })
    } catch (error) {
        res.status(406).json({error: error.message})  
    }

})

app.get('contacts/search', parseBody, (req,res) => {
    const [,token] = req.header('authorization').split(' ')

    const {sub: userId} = jwt.verify(token, SECRET)

    const query = req.query.q

    try {
        searchContact(userId, query, (error, contact) => {
            if(error) return res.status(404).json({error: error.message})
            res.send({contact})
        })
    } catch (error) {
        res.status(406).json({error: error.message})   
    }
})
// other


app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})

app.listen(8080, () => console.log(`${name} ${version} running`))