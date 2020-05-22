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

app.get('/register', (req, res) => res.send(App(Register())))

app.post('/register', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        // hola=mundo&hello=world

        const keyValues = body.split('&')

        const user = keyValues.reduce((user, keyValue) => {
            const [key, value] = keyValue.split('=')

            user[key] = decodeURIComponent(value)

            return user
        }, {})

        const { name, surname, email, password } = user

        registerUser(name, surname, email, password, (error, id) => {
            if (error) throw error // TODO error handling

            res.redirect('/login')
        })
    })
})

app.get('/login', (req, res) => res.send(App(Login())))

app.post('/login', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        // hola=mundo&hello=world

        const keyValues = body.split('&')

        const credentials = keyValues.reduce((user, keyValue) => {
            const [key, value] = keyValue.split('=')

            user[key] = decodeURIComponent(value)

            return user
        }, {})

        const { email, password } = credentials

        debugger

        authenticateUser(email, password, (error, userId) => {
            if (error) throw error // TODO error handling

            res.redirect(`/home?userId=${userId}`)
        })
    })
})

app.get('/home', (req, res) => {
    const { userId } = req.query

    retrieveUser(userId, (error, { name }) => {
        if (error) throw error // TODO error handling

        res.send(App(Home(name)))
    })
})

app.listen(8080)