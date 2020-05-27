const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact } = require('./logic')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')

const app = express()

const parseBody = bodyParser.json()
// users
// - register done
// - authenticate done
// - retrieve done
// - search ? done

// - update
// - unregister

// contacts
// - add    done
// - remove
// - update
// - search ? done

// sickies
// - add
// - remove
// - update
// - search ?


// ========================================= users

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


app.get('/users/:queryUser?', parseBody, (req, res) => {

    const [, userId] = req.header('authorization').split(' ')
    
    const { queryUser } = req.params;

    if (!userId) return res.status(406).json({ error: "unvalid token" })

    try {
         if(userId !== queryUser){
            retrieveUser( queryUser ,(error, user) => {
                if(error) return res.status(406).json({ error: error.message })

                return res.send({ user });
            })
        }
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
});

//========================= Contactssssssssssss

app.post('/contacts', parseBody, (req, res) => {

    const [, userId] = req.header('authorization').split(' ')

    const { body: contact } = req

    if (!userId) return res.status(406).json({ error: "unvalid token" })

    try {
        addContact(userId, contact, (error, contactId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ contactId })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})


app.get('/contacts/:idContact', (req, res) => {

    const [, userId] = req.header('authorization').split(' ')
    
    const { idContact } = req.params;

    if (!userId) return res.status(406).json({ error: "unvalid token" })

    try {
        searchContacts(idContact, (error, contacts) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ contacts })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
});

app.get('/contacts/:idContact',  (req, res) => {
    
    const { idContact } = req.params;
    
    const [, userId] = req.header('authorization').split(' ')

    if (!userId) return res.status(406).json({ error: "unvalid token" })

    try {
        removeContact(userId, idContact, (error) => {
            if (error)  return res.status(401).json({ error: error.message })
            if (feedback) res.send()
            else return res.render('ListContacts', { message });
        })
    } catch (error) {
        
        res.status(406).json({ error: error.message })
    }
});

app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})

app.listen(8080, () => console.log(`${name} ${version} running`))