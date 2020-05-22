const express = require('express')
const App = require('./components/App')
const Landing = require('./components/Landing')
const Register = require('./components/Register')
const Login = require('./components/Login')

const app = express()

app.use(express.static('public'))

app.get('/register', (req, res) => res.send(App(Register())))

app.post('/register', (req, res) => res.json(req.body))

app.get('/login', (req, res) => res.send(App(Login())))

app.get('/landing', (req, res) => res.send(App(Landing())))

app.listen(8080, () => console.log(`Server up and running on port ${8080}`))