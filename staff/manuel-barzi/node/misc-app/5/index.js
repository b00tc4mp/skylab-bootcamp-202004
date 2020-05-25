const express = require('express')
const { App, Register, Login, Home, Landing } = require('./components')
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
const { parseBody, parseCookies, cookieSession } = require('./utils/middlewares')

const app = express()

app.use(express.static('public'))

app.get('/', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted } } = req

    res.send(App(Landing(), cookiesAccepted))
})

app.get('/register', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.send(App(Register(), cookiesAccepted))
})

app.post('/register', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    registerUser(name, surname, email, password, (error, id) => {
        if (error) throw error // TODO error handling

        res.redirect('/login')
    })
})

app.get('/login', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.send(App(Login(), cookiesAccepted))
})

app.post('/login', parseBody, parseCookies, cookieSession, (req, res) => {
    const { body: { email, password } } = req

    authenticateUser(email, password, (error, userId) => {
        if (error) throw error // TODO error handling

        const { session } = req

        session.userId = userId

        res.redirect('/home')
    })
})

app.get('/home', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, user) => {
        if (error) throw error // TODO error handling

        const { name } = user

        res.send(App(Home(name), cookiesAccepted))
    })
})

app.post('/logout', parseCookies, cookieSession, (req, res) => {
    const { session } = req

    session.destroy()

    res.redirect('/login')
})

app.post('/accept-cookies', parseCookies, cookieSession, (req, res) => {
    const { session } = req

    session.cookiesAccepted = true

    res.redirect(req.header('referer'))
})

app.listen(8080, () => console.log('server running'))