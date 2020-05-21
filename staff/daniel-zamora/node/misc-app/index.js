const express = require('express')
const app = express()
const listContacts = require('./logic/list-contacts')
const ListContacts = require('./components/ListContacts')
const App = require('./components/App')
const searchContact = require('./logic/search-contacts')
const SearchContact = require('./components/SearchContacts')
const Register = require('./components/Register')
const registerUser = require('./logic/register-user')
const Login = require('./components/Login')
const loginUser=require('./logic/authenticate-user')
const authenticateUser = require('./logic/authenticate-user')
const Landing = require ('./components/Landing')
const objetize = require('./helper/objetize')
const Feedback = require('./components/Feedback')

app.use(express.static('public'))

// app.get('/contacts', (req,res)=>{
    
//     listContacts((error, contacts) => {
//         if (error) throw error 
        
//         res.send(App(ListContacts(contacts)))
//     })
// })
// app.get('/search', (req,res)=>{
    
//     const { url } = req
//     if (!url.includes('?')){
        
//         res.send(App(SearchContact()))
    
//     } else {
//         searchContact()
//     }
// })

app.get('/landing', (req, res)=>{
    res.send(App(Landing()))
})

app.get('/register', (req, res)=>{  debugger
     res.send(App(Register()))
    
    })

app.post('/register', (req,res)=>{ debugger
    req.on('data', chunk=> { 
        let obj = objetize(chunk)
        
        registerUser(obj,(error, id) => {
            res.send(App(Feedback(`Contact ${obj.name} created!`)))
        })
    })
})

app.get('/login', (req, res) => res.send(App(Login())))

app.post('/login', (req, res) => {
    req.on("data", chunk =>{
        let user = objetize(chunk)
        const {email, password} = user
        authenticateUser(email, password, (error, user)=>{ debugger
            const {name} = user
        
            res.send(App(Feedback(`You are in ${name}`)))
        })

    })
    
})


app.listen(8080)