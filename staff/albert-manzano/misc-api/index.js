const express = require('express')
// require('dotenv').config()
// const { PORT, SECRET } = process.env
const SECRET = 'my secret'
const { registerUser, authenticateUser, retrieveUser, addContact, searchContacts, deleteContact, updateUser, addSticky, updateContact, searchStickies, removeSticky } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const parseToken = require('./utils/middlewares/token')
const app = express()

const parseBody = bodyParser.json()

const jwt = require('jsonwebtoken')

const { JsonWebTokenError } = jwt


// ======================= user ============
//==========================================

//=====register=======

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

//====== remove====

app.delete('/users', (req, res) => {
    try {
    const [, token] = req.header('authorization').split(' ')

    const { sub: userId } = jwt.verify(token, SECRET)

        remove(userId, (error, userId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send("user removed")
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

//====== auth=========

app.post('/users/auth', parseBody, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) return res.status(401).json({ error: error.message })

            const token = jwt.sign({ sub: userId }, SECRET, { expiresIn: '1d' })

            res.send({ token })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})


//===== search retreive=====


app.get('/users/:userId?', (req, res) => {
    try {
        if (req.params.userId) {
            const { userId } = req.params

            retrieveUser(userId, (error, user) => {
                if (error) return res.status(404).json({ error: error.message })
                res.send(user)
            })
        } else {
            const [, token] = req.header('authorization').split(' ')

            const { sub: userId } = jwt.verify(token, SECRET)

            retrieveUser(userId, (error, user) => {
                if (error) return res.status(404).json({ error: error.message })
                res.send(user)
            })
        }
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

})

//======== update =====

app.patch('/update', parseBody, (req, res) => {
    try {
    const { body: { name, surname, email, password } } = req

    const [, token] = req.header('authorization').split(' ')

    const { sub: userId } = jwt.verify(token, SECRET)

        updateUser(userId, name, surname, email, password, (error) => {
            if (error) return res.status(404).json({ error: error.message })

            res.send('updated')
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})


// =====================contacts=============
//===========================================


app.post('/contacts', parseBody, (req, res) => {
    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        const { body: contact } = req

        addContact(userId, contact, (error, contactId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ contactId })
        })
    } catch (error) {
        if (error instanceof JsonWebTokenError)
            res.status(401)
        else
            res.status(406)

        res.json({ error: error.message })
    }
})

app.get('/contact/:contactId', parseBody, (req, res) => {
  
    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        const { contactId } = req.params

        searchContacts(userId, contactId, (error, contact) => {
            if (error) return res.status(404).json({ error: error.message })
            res.send({ contact })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
    // TODO extract userId from authorization (bearer token) then retrieve contact by contact id param and send it back
})

app.get('/contacts/search', parseBody, (req, res) => {
    debugger
    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        const query = req.query.q

        searchContacts(userId, query, (error, contact) => {
            if (error) return res.status(404).json({ error: error.message })
            res.send({ contact })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })

    }
})

app.delete('/contact/:contactId', parseBody, (req, res) => {
    debugger
    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)
        const { contactId } = req.params

        deleteContact(userId, contactId, (error) => {
            if (error) return res.status(404).json({ error: error.message })
            res.send("deleted")
        })

    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.patch('/update-contact/:contactId', parseBody, (req, res) => {
    const { body } = req
    try {

        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        const { contactId } = req.params

        updateContact(userId, contactId, body, (error) => {
            if (error) return res.status(404).json({ error: error.message })

            res.send('updated')
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

// =====================stickies=============
//===========================================


// ====add Sticky

app.post('/stickies', parseBody, (req, res) => {
    debugger
    try {
        const { body } = req
        
       /*  const {sticky} = body */

        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)


        addSticky(userId, body, (error, id) => {
            if (error) return res.status(404).send({ error: error.message })

            res.send("sticky added")
        })
    } catch (error) {
        res.status(406).send({ error: error.message })

    }
})

// ===============search stickies

app.get('/stickies/search', parseBody, (req, res) => {

    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        const query = req.query.q

        searchStickies(userId, query, (error, stickies) => {
            if (error) return res.status(404).json({ error: error.message })
            res.send({ stickies })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })

    }
})
//============ remove stickies

app.delete('/stickies/:idSticky', parseBody, (req, res) => {

    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        const { idSticky } = req.params

        removeSticky(userId, idSticky, (error) => {
            if (error) return res.status(404).json({ error: error.message })
            res.send("sticky deleted")
        })

    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

// other

app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})

app.listen(8083, () => console.log(`${name} ${version} running`))