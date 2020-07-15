const express = require('express')
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
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
    // cookie: { secure: true } // WARN this does not make it work => RTFM!
    cookie: {},
    store: new FileStore({
        path: path.join(__dirname, 'data', 'sessions')
    })
})

app.use(express.static('public'))

app.get('/', cookieSession, (req, res) => {
    debugger
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Landing', { cookiesAccepted })
})

app.get('/register', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Register', { cookiesAccepted })
})

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

    res.status(404).render('NotFound404', { cookiesAccepted })
})

app.listen(8080, () => console.log('server running'))