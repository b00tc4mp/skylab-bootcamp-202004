const express = require('express')
const App = require('./components/App')
const Register = require('./components/Register')
const Login = require('./components/Login')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const Home = require('./components/Home')
const retrieveUser = require('./logic/retrieve-user')

const app = express()

app.use(express.static('public'))

app.get('/register', (req, res) => res.send(App(Register()))) // TODO redirect to home if cookie userId exists

function parseBody(req, res, next) {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        // hola=mundo&hello=world

        const keyValues = body.split('&')

        req.body = keyValues.reduce((body, keyValue) => {
            const [key, value] = keyValue.split('=')

            body[key] = decodeURIComponent(value)

            return body
        }, {})

        next()
    })
}

app.post('/register', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    registerUser(name, surname, email, password, (error, id) => {
        if (error) throw error // TODO error handling

        res.redirect('/login')
    })
})

function parseCookies(req, res, next) {
    const cookies = req.header('cookie')

    req.cookies = {}

    if (cookies) {
        const keyValues = cookies.split(';').map(keyValue => keyValue.trim())

        keyValues.reduce((cookies, keyValue) => {
            const [key, value] = keyValue.split('=')

            cookies[key] = decodeURIComponent(value)

            return cookies
        }, req.cookies)
    }

    next()
}

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