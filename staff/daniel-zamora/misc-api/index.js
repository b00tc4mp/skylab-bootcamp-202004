require('dotenv').config()

const { PORT = 8080, SECRET } = process.env

const express = require('express')
const { register, login, retrieveUser, addContact, searchUsers, unregisterUser, updateUser,retrieveContact } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const jwt = require('jsonwebtoken')
const app = express()
const { handleError } = require('./helpers')
const parseBody = bodyParser.json()

// users

app.post('/users', parseBody, (req, res) => { debugger

    const { body: { name, surname, email, password } } = req

    try {
        register(name, surname, email, password)
            .then(()=>res.status(201).send())
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
})

app.post('/users/auth', parseBody, (req, res) => {
    const { body: { email, password } } = req

    try {
        login(email, password)
            .then(userId=> { 
                const token = jwt.sign({ sub: userId }, SECRET)

                res.send({ token })
            })

            .catch(error => handleError(error, res))
    }catch(error){
        handleError(error, res)
    }
})

app.get('/users/:userId?', (req, res) => { debugger
    try {
        const [, token] = req.headers.authorization.split(' ')

        let { sub: id } = jwt.verify(token, SECRET)

        let { params: { userId } } = req
        if (!userId) userId = id
        try{
            retrieveUser(userId)
                .then(user=> res.send(user))
                .catch(error => handleError(error, res)) 
    
        }catch(error){
            handleError(error, res)
        }
    } catch (error) {
        handleError(error, res)
    }
})

app.get('/users/search/:query?', (req, res) => {
    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)
        const { params: { query } } = req
        searchUsers(userId, query)
            .then(users => res.send(users))

            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
})

app.delete('/users/delete', parseBody, (req, res) => {

    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        const { body: { email, password } } = req

        unregisterUser(email, password, userId)
            .then(()=>res.status(204).send())
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

        updateUser(userId, body) 
            .then(()=> res.status(204).send())
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
})

// contacts

// app.post('/contacts', parseBody, (req, res) => {

//     try {

//         const [, token] = req.header('authorization').split(' ')

//         const { sub: userId } = jwt.verify(token, SECRET)

//         const { body: contact } = req

//         addContact(userId, contact, (error, contactId) => {
//             if (error) return res.status(401).json({ error: error.message })

//             res.send({ contactId })
//         })
//     } catch (error) {
//         if (error instanceof JsonWebTokenError)
//             res.status(401).send()
//         else
//             res.status(406).json({ error: error.message })
//     }
// })

// app.get('/contacts/contactsId:contactId', (req, res) => {
// try{
//     const [, token] = req.header('authorization').split(' ')

//     const { sub: userId } = jwt.verify(token, SECRET)

//     const { params : { contactId } }= req

//     retrieveContact(contactId, (error, [users] ) => {
//         if (error) return res.status(401).json({error : error.message})

//         res.send({users})
//     })
    
//     }catch(error) {
//         if (error instanceof JsonWebTokenError)
//             res.status(401).send()
//         else
//             res.status(406).json({error: error.message})
//     }

// })

// app.delete('/contacts/delete', bodyParser, (req, res) => {
//     try{
//         const [, token] = req.header('authorization').split(' ')

//         const  { sub: userId } = jwt.verify(token,SECRET)

//         const {params : { contactId } } = req

//         deleteContact(userId, contactId, (error) => {

//         })
//     }catch(error){
//         if(error instanceof JsonWebTokenError)
//             res.status(401).send()
//         else
//             res.status(406).json({error: error.message})
//     }
// })
// other

app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})

app.listen(8080, () => console.log(`${name} ${version} running in ${PORT}`))