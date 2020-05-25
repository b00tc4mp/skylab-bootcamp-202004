const express = require('express')
const { App, Register, Login, Home } = require('./components')
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
const { parseBody, parseCookies } = require('./utils/middlewares')

const app = express()

app.use(express.static('public'))

app.get('/register', (req, res) => res.send(App(Register()))) // TODO redirect to home if cookie userId exists

app.post('/register', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    registerUser(name, surname, email, password, (error, id) => {
        if (error) throw error // TODO error handling

        res.redirect('/login')
    })
})

app.get('/login', parseCookies, (req, res) => {
    const { cookies: { userId } } = req

    if (userId) return res.redirect('/home')

    res.send(App(Login()))
})

app.post('/login', parseBody, (req, res) => {
    const { body: { email, password } } = req

    authenticateUser(email, password, (error, userId) => {
        if (error) throw error // TODO error handling

        //res.setHeader('set-cookie', `userId=${userId}`)
        res.cookie('userId', userId)

        res.redirect('/home')
    })
})

app.get('/home', parseCookies, (req, res) => {
    const { cookies: { userId } } = req

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, user) => {
        if (error) throw error // TODO error handling

        const { name } = user

        res.send(App(Home(name)))
    })
})

app.post('/logout', (req, res) => {
    res.clearCookie('userId')

    res.redirect('/login')
})

app.listen(8080, () => console.log('server running'))