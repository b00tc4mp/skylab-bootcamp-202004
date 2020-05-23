const express = require('express')
const App = require('./components/App')
const Landing = require('./components/Landing')
const Register = require('./components/Register')
const Login = require('./components/Login')
const Home = require('./components/Home')
const register = require('./logic/register-user')
const authenticated = require('./logic/authenticate-user')
const Feedback = require('./components/Feedback')


const app = express()

app.use(express.static('public'))

app.get('/landing', (req, res) => res.send(App(Landing())))

app.get('/register', (req, res) => {
    res.send(App(Register()))
})

app.post('/register', (req, res) => {
    req.on('data', chunk => {
        const data = {}

        const user = chunk.toString().replace('%40','@').split('&')

        user.forEach( _user => {
            data[_user.split('=')[0]] = _user.split('=')[1]
        })

        register(data, error => {
            if (error) res.send(App(Register(Feedback(error.message,'warning'))))
            
            res.send(App(Login()))
        })
    })
})

app.get('/login', (req, res) => {
    res.send(App(Login()))
})

app.post('/login', (req, res) => {
    
    req.on('data', chunk =>{
        
        const data = {}
        const user = chunk.toString().replace('%40','@').split('&')
        
        user.forEach( _user => {
            data[_user.split('=')[0]] = _user.split('=')[1]
        })

        authenticated(data,(error,body)=>{    
        if (error) res.send(App(Login(Feedback(error.message,'warning'))))
    
        res.send(App(Home()))
        })
    })
})

app.get('/home',(req,res) => res.send(App(Home())))





app.listen(8080)