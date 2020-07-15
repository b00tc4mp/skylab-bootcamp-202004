require('dotenv').config()
const { SECRET, PORT } = process.env

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact, retrieveContact } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const jwt = require('jsonwebtoken')
const { handleError } = require('./helpers')
//npm i jsonwebtoken
//npm i dotenv
// .env ---> SECRET = MI SECRETO
// PORT = 8080

//const token = jwt.sign({ sub: userId }, SECRET, { expiresIn: '1d' })

//const { sub: userId } = jwt.verify(token, SECRET)

require('dotenv').config()

const app = express()

const parseBody = bodyParser.json()

// users

app.post('/users', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password)
            .catch( error => handleError(error, res))

            .then( () => res.status(201).send())
            
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.post('/users/auth', parseBody, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(userId => {
                const token = jwt.sign({ sub: userId }, SECRET, { expiresIn: '1d' })
                res.status(200).send({token})
            })
            .catch(error => res.status(406).json({ error: error.message }))
    } catch (error) {
        handleError(error, res)    }
})

app.get('/users/:id?', parseBody, (req, res) => {
    if(!req.headers.authorization) return res.status(411).json({ error: "Authorization required" })

    const { params: {id}, headers: {authorization} } = req
    const [, token] = authorization.split(' ')
    
    try{
        const {sub: userId} = jwt.verify(token, SECRET)
        retrieveUser(userId)
            .catch(error => handleError(error, res))
            .then(user => {
                if(!id) res.status(201).json(user)
                retrieveUser(id)
                .catch( error => handleError (error, res))
                .then(()=>res.status(201).json(user)) 
            }) 

    }catch(error){
        handleError(error, res)
    }
})

// contacts

app.post('/contacts', parseBody, (req, res) => {
    const [, token] = req.header('authorization').split(' ')
    const { body: contact } = req

    try {
        const {sub: userId} = jwt.verify(token, SECRET)
        addContact(userId, contact, (error, contactId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ contactId })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.get('/contacts/:contactId?', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve contact by contact id param and send it back
    if(!req.headers.authorization) return res.status(411).json({ error: "Authorization required" })

    const { params: {contactId}, headers: {authorization} } = req
    const [, token] = authorization.split(' ')
    
    try{
        retrieveUser(token, (error, user) =>{
            if(error) return res.status(401).json({ error: 'Invalid token' })
            try{
                retrieveContact( contactId, (error, contact)=>{
                    if(error) return res.status(400).json({ error: error.message })
    
                    res.status(201).json(contact)
                })
            }catch(error){
                res.status(411).json({ error: "Invalid contact Id" }) 
            }
        })
    }catch(error){
        res.status(411).json({ error: error.message })
    }
})

// other

app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})

app.listen(PORT, () => console.log(`${name} ${version} running`))