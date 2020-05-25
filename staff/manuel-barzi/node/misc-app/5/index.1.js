const express = require('express')
const { App, Register, Login, Home, Landing } = require('./components')
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
const { parseBody, parseCookies } = require('./utils/middlewares')
const { uid } = require('./utils')

const app = express()

app.use(express.static('public'))

const sessions = {}

app.get('/', parseCookies, (req, res) => {
    let { cookies: { sessionId } } = req, session

    if (!sessionId) {
        sessionId = uid()

        session = sessions[sessionId] = { cookiesAccepted: false }

        res.cookie('sessionId', sessionId)
    } else {
        session = sessions[sessionId]
    }

    res.send(App(Landing(), session.cookiesAccepted))
})

app.get('/register', parseCookies, (req, res) => {
    let { cookies: { sessionId } } = req, session

    if (!sessionId) {
        sessionId = uid()

        session = sessions[sessionId] = { cookiesAccepted: false }

        res.cookie('sessionId', sessionId)
    } else {
        session = sessions[sessionId]
    }

    if (session.userId) return res.redirect('/home')

    res.send(App(Register(), session.cookiesAccepted))
})

app.post('/register', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    registerUser(name, surname, email, password, (error, id) => {
        if (error) throw error // TODO error handling

        res.redirect('/login')
    })
})

app.get('/login', parseCookies, (req, res) => { 
    let { cookies: { sessionId } } = req, session

    if (!sessionId) {
        sessionId = uid()

        session = sessions[sessionId] = { cookiesAccepted: false }

        res.cookie('sessionId', sessionId)
    } else {
        session = sessions[sessionId]
    }

    if (session.userId) return res.redirect('/home')

    res.send(App(Login(), session.cookiesAccepted))
})

app.post('/login', parseBody, parseCookies, (req, res) => {
    const { body: { email, password } } = req

    authenticateUser(email, password, (error, userId) => {
        if (error) throw error // TODO error handling

        let { cookies: { sessionId } } = req, session

        if (!sessionId) {
            sessionId = uid()

            session = sessions[sessionId] = { cookiesAccepted: false }

            res.cookie('sessionId', sessionId)
        } else {
            session = sessions[sessionId]
        }

        debugger

        session.userId = userId

        res.redirect('/home')
    })
})

app.get('/home', parseCookies, (req, res) => {
    let { cookies: { sessionId } } = req, session

    if (!sessionId) {
        sessionId = uid()

        session = sessions[sessionId] = { cookiesAccepted: false }

        res.cookie('sessionId', sessionId)
    } else {
        session = sessions[sessionId]
    }

    if (!session.userId) return res.redirect('/login')

    retrieveUser(session.userId, (error, user) => {
        if (error) throw error // TODO error handling

        const { name } = user

        res.send(App(Home(name), session.cookiesAccepted))
    })
})

app.post('/logout', parseCookies, (req, res) => {
    let { cookies: { sessionId } } = req, session

    if (!sessionId) {
        sessionId = uid()

        session = sessions[sessionId] = { cookiesAccepted: false }

        res.cookie('sessionId', sessionId)
    } else {
        session = sessions[sessionId]
    }

    delete sessions[sessionId]

    res.clearCookie('sessionId')

    res.redirect('/login')
})

app.post('/accept-cookies', parseCookies, (req, res) => {
    let { cookies: { sessionId } } = req, session

    if (!sessionId) {
        sessionId = uid()

        session = sessions[sessionId] = { cookiesAccepted: false }

        res.cookie('sessionId', sessionId)
    } else {
        session = sessions[sessionId]
    }

    session.cookiesAccepted = true

    //res.redirect('/')    
    res.redirect(req.header('referer'))
})

app.listen(8080, () => console.log('server running'))