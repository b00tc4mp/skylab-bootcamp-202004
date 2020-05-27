const express = require('express')
// const { Home, ListContacts, SearchContacts, AddSticky, ListStickies, SearchStickies, Feedback } = require('./components')
const { registerUser, authenticateUser, retrieveUser, listContacts, searchContacts, addContact, addSticky, listStickies, searchStickies, removeContacts, } = require('./logic')
// const { bodyParse, sessionCookies } = require('./utils/middlewares')

const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const app = express()

app.set('view engine', 'pug')
app.set('views', './components')

const bodyParse = bodyParser.urlencoded({ extended: false })

const sessionCookies = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } // WARN this does not make it work => RTFM!
    cookie: {},
    store: new FileStore
})

app.use(express.static('public'))

app.get('/register', sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Register', { cookiesAccepted })
})

app.post('/register', bodyParse, (req, res) => {

    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password, (error, id) => {
            debugger

            if (error) {
                const { message } = error
                return res.render('Register', { message }) // TODO add feedback

                // res.redirect('/login')
            }
        })
    } catch (error) {
        const { message } = error
        res.render('Register', { message })
    }
})

app.get('/login', sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Login', { cookiesAccepted })
})

app.post('/login', bodyParse, sessionCookies, (req, res) => {
    const { body: { email, password } } = req

    const { session: { cookiesAccepted } } = req

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) {
                const { message } = error
                res.render('Login', { message })
            }

            const { session } = req

            session.userId = userId

            session.save(error => {
                if (error) throw error

                res.redirect('/home')
            })
        })
    } catch (error) {
        const { message } = error
        res.render('Login', { message, cookiesAccepted })
    }
})

app.get('/home', sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, user) => {
        if (error) throw error //TODO add feedback

        const { name } = user

        res.render('Home', { name, cookiesAccepted })
    })
})

app.post('/logout', sessionCookies, (req, res) => {
    const { session } = req

    session.destroy(error => {
        if (error) throw error

        res.redirect('/login')
    })
})

app.post('/accept-cookies', sessionCookies, (req, res) => {
    const { session } = req

    session.cookiesAccepted = true

    session.save(error => {
        if (error) throw error

        res.redirect(req.header('referer'))
    })
})

app.get('/contacts', sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    try {
        listContacts(userId, (error, contacts) => {
            if (error) {
                const { message } = error
                return res.render('ListContacts', { message, cookiesAccepted })
            }

            res.render('ListContacts', { contacts, cookiesAccepted })
        })
    } catch (error) {
        const { message } = error
        return res.render('ListContacts', { message, cookiesAccepted })
    }
})

app.get('/add-contact', sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    res.render('AddContact', { cookiesAccepted })
})

app.post('/add-contact', bodyParse, sessionCookies, (req, res) => {
    const { body, body: { name } } = req
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    addContact(userId, body, (error, contactId) => {
        if (error) {
            const { message } = error
            res.render('Feedback', { message })
        }
        else {
            res.render('AddContact', { message: `Contact with name ${name} created`, cookiesAccepted })
        }
    })
})

app.get('/search', bodyParse, sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) res.redirect('/login')

    const { url } = req

    if (!url.includes('?')) res.render('SearchContacts', { cookiesAccepted })
    else {
        const query = req.query.q

        searchContacts(userId, query, (error, contacts) => {

            if (error) {
                const { message } = error
                res.render('SearchContacts', { message, cookiesAccepted })
            }
            else {
                res.render('SearchContacts', { query, contacts, cookiesAccepted })
            }
        })
    }

})


app.post('/delete-contact', bodyParse, sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) res.redirect('/login')

    const { body: { contactId } } = req

    removeContacts(userId, contactId, error => {
        if (error) throw error //TODO feedback

        res.redirect('/contacts')
    })
})

app.get('/add-sticky', sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    res.render('AddSticky', { cookiesAccepted })

})

app.post('/add-sticky', bodyParse, sessionCookies, (req, res) => {
    const { body } = req
    const { session: { cookiesAccepted, userId } } = req

    try {
        addSticky(userId, body, (error, stickyId) => {
            if (error) {
                res.render('AddSticky', { message, cookiesAccepted })
            } else {
                res.render('AddSticky', { message: 'Note is added', cookiesAccepted })
            }
        })
    } catch (error) {
        const { message } = error
        res.render('AddSticky', { message, cookiesAccepted })
    }

})

app.get('/stickies', sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    try {
        listStickies(userId, (error, stickies) => {
            if (error) {
                const { message } = error
                return res.render('ListStickies', { message, cookiesAccepted })
            }
            res.render('ListStickies', { stickies, cookiesAccepted })
        })
    } catch (error) {
        const { message } = error
        return res.render('ListStickies', { message, cookiesAccepted })
    }
})

app.get('/search-stickies', bodyParse, sessionCookies, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) res.redirect('/login')

    const { url } = req

    if (!url.includes('?')) res.render('SearchStickies', { cookiesAccepted })

    else {
        const query = req.query.q

        searchStickies(userId, query, (error, stickies) => {
            if (error) {
                const { message } = error
                res.render('SearchStickies', { message, cookiesAccepted })
            }
            else {
                res.render('SearchStickies', { query, stickies, cookiesAccepted })
            }
        })
    }
})


app.listen(8080, () => console.log('server running'))