const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact, addSticky, searchContacts } = require('./logic')
const { users, contacts, stickies } = require('./data')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')

const app = express()

const parseBody = bodyParser.json()

// users

app.post('/users', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password, error => {
            if (error) return res.status(409).json({ error: error.message })

            res.status(201).send()
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.post('/users/auth', parseBody, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ userId })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.get('/users/:userId', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve user and send it back
    // TODO if userId is received as a param, the retrieve that user instead of requester user
    const [, loggedUser] = req.header('authorization').split(' ')

    const { userId } = req.params

    try {

        users.find({id: loggedUser}, (error, [user]) => {
            if (error) return res.status(401).json({error: error.message})

            if (user) {
                
                    retrieveUser(userId, (error, userFound)=>{
                        if (error) return res.status(404).json({error: error.message})
            
                        res.send(userFound)
                    })
                
            } else res.status(406).json({error: 'user not authorized'})
        }) 
    } catch ({message}) {
        res.status(406).json({error: message})
    }
})


// contacts

app.post('/contacts', parseBody, (req, res) => {
    const [, userId] = req.header('authorization').split(' ')

    const { body: contact } = req

    try {
        addContact(userId, contact, (error, contactId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ contactId })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.get('/contacts/:contactId', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve contact by contact id param and send it back
    const [, loggedUser] = req.header('authorization').split(' ')

    const { contactId } = req.params

    try{
        users.find({id: loggedUser}, (error, [user]) => {
            if (error) return res.status(404).json({error: error.message})

            if (user) {
                    contacts.find({id: contactId}, (error, [contactFound])=>{
                        if (error) return res.status(401).json({error: error.message})

                        if (!contactFound) return res.status(404).json({error: "No contact found"})
            
                        res.send(contactFound)
                    })
                
            } else res.status(401).json({error: 'user not authorized'})
        }) 
    } catch ({message}) {
        res.status(406).json({error: message})
    }

})

app.get('/contacts/q/:query', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve contact by contact id param and send it back
    const [, loggedUser] = req.header('authorization').split(' ')

    const { query } = req.params

    try {
        
        searchContacts(loggedUser, query, (error, results)=>{
            if (error) return res.status(401).json({error: error.message})

            if (!results) return res.status(404).json({error: "No contacts found"})

            res.send(results)

        })
       
    } catch ({message}) {
        res.status(406).json({error: message})
    }

})

// stickie

app.post('/stickies', parseBody, (req, res) => {
    const [, userId] = req.header('authorization').split(' ')

    const { body: sticky } = req

    try {
        addSticky(userId, sticky, (error, stickyId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ stickyId })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.get('/stickies/:stickyId', (req, res) => {
    // TODO extract userId from authorization (bearer token) then retrieve contact by contact id param and send it back
    const [, loggedUser] = req.header('authorization').split(' ')

    const { stickyId } = req.params

    try{
        users.find({id: loggedUser}, (error, [user]) => {
            if (error) return res.status(404).json({error: error.message})

            if (user) {
                    stickies.find({id: stickyId}, (error, [stickyFound])=>{
                        if (error) return res.status(401).json({error: error.message})

                        if (!stickyFound) return res.status(404).json({error: "No stickies found"})
            
                        res.json(stickyFound)
                    })
                
            } else res.status(401).json({error: 'user not authorized'})
        }) 
    } catch ({message}) {
        res.status(406).json({error: message})
    }

})

// other

app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})



app.listen(8080, () => console.log(`${name} ${version} running`))