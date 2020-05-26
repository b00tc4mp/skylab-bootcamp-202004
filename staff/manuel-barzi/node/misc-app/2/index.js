const express = require('express')
const App = require('./components/App')
const Register = require('./components/Register')
const Login = require('./components/Login')

const app = express()

app.use(express.static('public'))

app.get('/register', (req, res) => res.send(App(Register())))

app.get('/login', (req, res) => res.send(App(Login())))

app.listen(8080)