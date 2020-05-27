const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact, searchContacts, listContacts } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path = require('path')

const app = express()

app.set('view engine', 'pug')
app.set('views', './components')

const parseBody = bodyParser.urlencoded({ extended: false })

const cookieSession = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new FileStore({
        path: path.join(__dirname, 'data', 'sessions')
    })
})

app.use(express.static('public'))

app.get('/', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Landing', { cookiesAccepted })
})

app.get('/landing', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Landing', { cookiesAccepted })
})

app.get('/register', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Register', { cookiesAccepted })
})





app.get('/login', (req, res) => res.send(App(Login())))
app.get('/home', (req, res) => {
    const cookie = req.header('cookie')

    if (!cookie) return res.redirect('/login')

    const [, userId] = cookie.split('=')

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, { name }) => {
        if (error) throw error

        res.send(App(Home(name))) 
    })
})
app.get('/add-contact', (req, res) => res.send(App(AddContact())))
app.get('/search-contacts', (req, res) => res.send(App(SearchContacts())))
app.get('/list-contacts', (req, res) => res.send(App(ListContacts())))

app.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body

    registerUser(name, surname, email, password, (error, id) => {
        if (error) throw error

        res.redirect('/login')
    })
})
app.get('/auth', (req, res) => {
    const { email, password } = req.query

    authenticateUser(email, password, (error, userId) => {
        if (error) throw error

        res.cookie('userId', userId)

        res.redirect('/home')
    })
})
app.post('/add-contact', (req, res) => {
    const cookie = req.header('cookie')
    if(!cookie) return res.redirect('/login')
    const [,userId] = cookie.split('=')

    const { name, surname, email, phone, birthdate, country } = req.body

    addContact(userId, { name, surname, email, phone, birthdate, country }, (error, id) => {
        if (error) throw error

        res.redirect('/home')
    })
})
app.post('/search-contacts', (req, res) => {
    const cookie = req.header('cookie')
    if(!cookie) return res.redirect('/login')
    const [,userId] = cookie.split('=')

   searchContacts(userId, query, (error, id) => {
        if (error) throw error

        res.redirect('/list-contacts')
    })
})
app.post('/logout', (req, res) => {
    res.clearCookie('userId')

    res.redirect('/login')
})

app.listen(8080, () => console.log(`Server up and running on port ${8080}`))












app.post('/register', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    registerUser(name, surname, email, password, (error, id) => {
        if (error) throw error // TODO error handling

        res.redirect('/login')
    })
})

app.get('/login', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Login', { cookiesAccepted })
})

app.post('/login', parseBody, cookieSession, (req, res) => {
    const { body: { email, password } } = req

    authenticateUser(email, password, (error, userId) => {
        if (error) throw error // TODO error handling

        const { session } = req

        session.userId = userId

        session.save(error => {
            if (error) throw error

            res.redirect('/home')
        })
    })
})

app.get('/home', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, user) => {
        if (error) throw error // TODO error handling

        const { name } = user

        res.render('Home', { cookiesAccepted, name })
    })
})

app.get('/add-contact', cookieSession, (req, res) => {
    const { session: cookiesAccepted } = req
    res.render('AddContact', { cookiesAccepted })
})

app.post('/add-contact', cookieSession, bodyParser, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    const { body: { name,surname, email, phone, birthdate, country } } = req

    addContact(userId, { name, surname, email, phone, birthdate, country }, (error, id) => {
        if (error) throw error

        res.redirect('/home')
    })
})

app.post('/logout', cookieSession, (req, res) => {
    const { session } = req

    session.destroy(error => {
        if (error) throw error

        res.redirect('/login')
    })
})

app.post('/accept-cookies', cookieSession, (req, res) => {
    const { session } = req

    session.cookiesAccepted = true

    session.save(error => {
        if (error) throw error // TODO error handling

        res.redirect(req.header('referer'))
    })

})

app.get('*', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('NotFound404', { cookiesAccepted })
})

app.listen(8080, () => console.log('server running'))