const express = require('express')
const { App, Register, Login, Home, ListContacts, SearchContacts, AddContact, AddSticky, ListStickies, SearchStickies, Feedback } = require('./components')
const { registerUser, authenticateUser, retrieveUser, listContacts, searchContacts, addContact, addSticky, listStickies, searchStickies, removeContacts, } = require('./logic')
const { bodyParse, cookieParse, sessionCookies } = require('./utils/middlewares')

const app = express()

app.use(express.static('public'))

app.get('/register', cookieParse, sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.send(App(Register(), cookiesAccepted))
})

app.post('/register', bodyParse, (req, res) => {

    const { body: { name, surname, email, password } } = req

    registerUser(name, surname, email, password, (error, id) => {
        if (error) throw error // TODO add feedback

        res.redirect('/login')
    })
})

app.get('/login', cookieParse, sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.send(App(Login(), cookiesAccepted))
})

app.post('/login', bodyParse, cookieParse, sessionCookies, (req, res) => {
    const { body: { email, password } } = req

    authenticateUser(email, password, (error, userId) => {
        if (error) throw error //TODO Feedback

        const { session } = req

        session.userId = userId

        session.save(error => {
            if (error) throw error

            res.redirect('/home')
        })
    })
})

app.get('/home', cookieParse, sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, user) => {
        if (error) throw error //TODO add feedback

        const { name } = user

        res.send(App(Home(name), cookiesAccepted))
    })
})

app.post('/logout', cookieParse, sessionCookies, (req, res) => {
    const { session } = req

    session.destroy(error => {
        if (error) throw error

        res.redirect('/login')
    })
})

app.post('/accept-cookies', cookieParse, sessionCookies, (req, res) => {
    const { session } = req

    session.cookiesAccepted = true

    session.save(error => {
        if (error) throw error

        res.redirect(req.header('referer'))
    })
})

app.get('/contacts', cookieParse, sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    listContacts(userId, (error, contacts) => {
        if (error) res.send(App(Feedback(error.message)))
        res.send(App(ListContacts(contacts), cookiesAccepted))
    })
})

app.get('/add-contact', cookieParse, sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    res.send(App(AddContact(), cookiesAccepted))
})

app.post('/add-contact', bodyParse, cookieParse, sessionCookies, (req, res) => {
    const { body, body: { name } } = req
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    addContact(userId, body, (error, contactId) => {
        if (error) res.send(App(Feedback(error.message)))
        else {
            res.send(App(`${AddContact()}${Feedback(`Contact with name ${name} created`)}`, cookiesAccepted))
        }
    })
})

app.get('/search', cookieParse, (req, res) => {
    const { cookie: { userId } } = req
    if (!userId) res.redirect('/login')

    const { url } = req

    if (!url.includes('?')) res.send(App(SearchContacts()))
    else {
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

app.post('/delete-contact', cookieParse, bodyParse, (req, res) => {
    const { cookie: { userId } } = req

    if (!userId) res.redirect('/login')

    const { body: { contactId } } = req

    removeContacts(userId, contactId, error => {
        if (error) throw error //TODO feedback

        res.send(App(Feedback('The contact has been deleted')))
    })
})

app.get('/add-sticky', cookieParse, (req, res) => {
    const { cookie: { userId } } = req

    if (userId) {
        res.send(App(AddSticky()))
    } else res.redirect('/login')
})

app.post('/add-sticky', cookieParse, (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        const sticky = {}

        const [key, value] = body.split('=')

        sticky[key] = decodeURIComponent(value.split('+').join(' '))

        const { cookie: { userId } } = req

        addSticky(userId, sticky, (error, stickyId) => {
            if (error) res.send(App(Feedback(error.message)))
            else {
                res.send(App(`${AddSticky()}${Feedback(`Note is added`)}`))
            }
        })
    })
})

app.get('/stickies', cookieParse, (req, res) => {
    const { cookie: { userId } } = req

    listStickies(userId, (error, stickies) => {
        if (error) res.send(App(Feedback(error.message)))
        res.send(App(ListStickies(stickies)))
    })
})

app.get('/search-stickies', cookieParse, (req, res) => {
    const { cookie: { userId } } = req
    if (!userId) res.redirect('/login')

    const { url } = req

    if (!url.includes('?')) res.send(App(SearchStickies()))
    else {
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