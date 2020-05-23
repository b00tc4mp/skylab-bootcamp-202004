const express = require('express')
const app = express()
const AddContact = require('./components/AddContact')
const App = require('./components/App')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const bodyParser = require('body-parser')
const addContact = require('./logic/add-contact')
const Register = require('./components/Register')
const register = require('./logic/register')
const Login = require('./components/Login')
const login = require('./logic/login')
const Landing = require('./components/Landing')
const Navbar = require('./components/Navbar')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))



app.get('/landing', (req,res) => {
    res.send(App(Landing()))
})

app.get('/register', (req, res) =>{

    res.send(App(Register()))
    
})
app.post('/register', (req, res) => {

    const {body} = req

    register(body, error => {
        if(error) throw error
        
        res.send(App(Login()))
    })
    
})


app.get('/login', (req, res) => {
    res.send(App(Login()))
})


app.post('/login', (req, res) => {

    const {body: {email,password}} = req

    login(email, password, error =>{

        if(error) res.send(`<h1>${error.message}</h1>`)
       else  res.send(App(Navbar()))
    })
   
})

app.get('/add-contact', (req, res) =>{

    res.send(App(`${Navbar()} ${AddContact()}`))   
})

app.post('/add-contact', (req, res) => {
    
    const {body} = req
    addContact(body, (error, id) => {
        if(error) throw error
        
        res.send("<p>Data send correctly</p>")
    })        
})

app.get('/list', (req, res) => {
    
    res.send(App(`${Navbar()} ${ListContacts()}`))
})

app.get('/search', (req, res) => {
    
    res.send(App(`${Navbar()} ${SearchContacts()}`))
})




app.listen(8080)