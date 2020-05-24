const express = require('express')
const App = require('./components/App')
const Register = require('./components/Register')
const registerUser = require('./logic/register-user')
const Login = require('./components/Login')
const authenticateUser = require('./logic/authenticate-user')
const Home = require('./components/Home')
const retrieveUser = require('./logic/retrieve-user')
const ListContacts = require('./components/ListContacts')
const listContacts = require('./logic/list-contacts')
const SearchContacts = require('./components/SearchContacts')
const searchContacts = require('./logic/search-contacts')
const AddContact = require('./components/AddContact')
const addContact = require('./logic/add-contact')
const addSticky = require('./logic/add-sticky')
const AddSticky = require('./components/AddSticky')
const listStickies = require('./logic/list-stickies')
const ListStickies = require('./components/ListStickies')
const SearchStickies = require('./components/SearchStickies')
const searchStickies = require('./logic/search-stickies')
const removeContacts = require('./logic/remove-contacts')
// const Landing = require('./public/components/Landing')
const Feedback = require('./components/Feedback')
// const objetize = require('./helpers/objetize')

const app = express()

app.use(express.static('public'))

app.get('/register', (req, res) => res.send(App(Register())))

app.post('/register', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        const keyValues = body.split('&')

        const user = keyValues.reduce((user, keyValue) => {
            const [key, value] = keyValue.split('=')

            user[key] = decodeURIComponent(value)

            return user
        }, {})

        const { name, surname, email, password } = user

        registerUser(name, surname, email, password, (error, id) => {
            if (error) throw error // TODO add feedback

            res.redirect('/login')
        })
    })
})

app.get('/login', (req, res) => {
    const cookie = req.header('cookie')

    if (cookie) {
        const [, userId] = cookie.split('=')

        // if (userId) return res.redirect('/home')
    }

    res.send(App(Login()))
})

app.post('/login', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        const keyValues = body.split('&')

        const credentials = keyValues.reduce((user, keyValue) => {
            const [key, value] = keyValue.split('=')

            user[key] = decodeURIComponent(value)

            return user
        }, {})

        const { email, password } = credentials

        authenticateUser(email, password, (error, userId) => {
            if (error) throw error //TODO Feedback

            res.cookie('userId', userId)

            res.redirect('/home')
        })
    })
})

app.get('/home', (req, res) => {
    const cookie = req.header('cookie')

    if (!cookie) return res.redirect('./login')

    const [, userId] = cookie.split('=')

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, { name }) => {
        if (error) throw error //TODO add feedback

        res.send(App(Home(name)))
    })
})

app.post('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/login')
})

app.get('/contacts', (req, res) => {
    const cookie = req.header('cookie')
    if (cookie) {
        const [, userId] = cookie.split('=')
        listContacts(userId, (error, contacts) => {
            if (error) res.send(App(Feedback(error.message)))
            res.send(App(ListContacts(contacts)))
        })
    }
})

app.get('/add-contact', (req, res) => {
    const cookie = req.header('cookie')
    if (cookie) {
        res.send(App(AddContact()))
    } else res.redirect('/login')
})

app.post('/add-contact', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        const keyValues = body.split('&')

        const contact = keyValues.reduce((contact, keyValue) => {
            const [key, value] = keyValue.split('=')

            contact[key] = decodeURIComponent(value)

            return contact
        }, {})

        const cookie = req.header('cookie')
        const [, userId] = cookie.split('=')

        addContact(userId, contact, (error, contactId) => {
            if (error) res.send(App(Feedback(error.message)))
            else {
                const { name } = contact
                res.send(App(`${AddContact()}${Feedback(`Contact with name ${name} created`)}`))
            }
        })
    })
})

app.get('/search', (req, res) => {
    const cookie = req.header('cookie')
    if (!cookie) res.redirect('/login')

    const { url } = req

    if (!url.includes('?')) res.send(App(SearchContacts()))
    else {
        const [, userId] = cookie.split('=')
        const [, queryString] = url.split('?')
        const [, query] = queryString.split('=')

        searchContacts(userId, query, (error, contacts) => {
            if (error) {
                res.send(App(`${SearchContacts()}${Feedback(error.message)}`))
            }
            else {
                res.send(App(`${SearchContacts(query)}${ListContacts(contacts)}`))
            }
        })
    }

})

// app.get('/delete-contact', (req, res) => {
//     const contactId = req.params.id

//     const cookie = req.header('cookie')
//     if (!cookie) res.redirect('/login')
//     const [, userId] = cookie.split('=')

//     removeContacts(userId, contactId, error =>{
//         if (error) throw error //TODO feedback

//         res.send(App(SearchContacts()))
//     })
// })

app.get('/add-sticky', (req, res) => {
    const cookie = req.header('cookie')
    if (cookie) {
        res.send(App(AddSticky()))
    } else res.redirect('/login')
})

app.post('/add-sticky', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        const sticky = {}

        const [key, value] = body.split('=')

        sticky[key] = decodeURIComponent(value.split('+').join(' '))

        const cookie = req.header('cookie')
        const [, userId] = cookie.split('=')

        addSticky(userId, sticky, (error, stickyId) => {
            if (error) res.send(App(Feedback(error.message)))
            else {
                res.send(App(`${AddSticky()}${Feedback(`Note is added`)}`))
            }
        })
    })
})

app.get('/stickies', (req, res) => {
    const cookie = req.header('cookie')
    if (cookie) {
        const [, userId] = cookie.split('=')
        listStickies(userId, (error, stickies) => {
            if (error) res.send(App(Feedback(error.message)))
            res.send(App(ListStickies(stickies)))
        })
    }
})

app.get('/search-stickies', (req, res) => {
    const cookie = req.header('cookie')
    if (!cookie) res.redirect('/login')

    const { url } = req

    if (!url.includes('?')) res.send(App(SearchStickies()))
    else {
        const [, userId] = cookie.split('=')
        const [, queryString] = url.split('?')
        const [, query] = queryString.split('=')

        searchStickies(userId, query, (error, stickies) => {
            if (error) {
                res.send(App(`${SearchStickies()}${Feedback(error.message)}`))
            }
            else {
                res.send(App(`${SearchStickies(query)}${ListStickies(stickies)}`))
            }
        })
    }
})



app.listen(8080)