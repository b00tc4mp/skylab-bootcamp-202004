const express = require('express')
const App = require('./components/App')
const Landing = require('./components/Landing')
const Register = require('./components/Register')
const registerUser = require('./logic/register-user')
const Login = require('./components/Login')
const authenticateUser = require('./logic/authenticate-user')
const Home = require('./components/Home')
const retrieveUser = require('./logic/retrieve-user')
const AddContact = require('./components/AddContact')
const addContact = require('./logic/add-contact')
const parseCookies = require('./utils/parse-cookies')

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(parseCookies)

app.get('/landing', (req, res) => res.send(App(Landing())))
app.get('/register', (req, res) => res.send(App(Register())))
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
app.post('/logout', (req, res) => {
    res.clearCookie('userId')

    res.redirect('/login')
})

app.listen(8080, () => console.log(`Server up and running on port ${8080}`))