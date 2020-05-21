const express = require('express')
const App = require('./components/App')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const addContact = require('./logic/add-contact')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const AddContact = require('./components/AddContact')
const Landing = require('./components/Landing')
const fs = require('fs')
const path = require('path')
const Feedback = require('./components/Feedback')
const objetize = require('./helper/objetize')
const Register = require('./components/Register')
const register = require('./logic/register')
const Login = require('./components/Login')
const authenticateUser = require('./logic/authenticate-user')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/contacts', (req, res) => {
    listContacts((error, contacts) => {
        if (error) throw error
        res.send(App(ListContacts(contacts)))
    })
})

app.get('/landing', (req, res) => {
    res.send(App(Landing()))

})

app.get('/add-contact', (req, res) => {
    res.send(App(AddContact()))
})

app.post('/add-contact', (req, res) => {
    req.on('data', data => {

        let obj = objetize(data)

        addContact(obj, (error, id) => {
            const {
                name
            } = obj

            if (error) {
                res.send(App(Feedback("Fail:(", 'error')))

            } else {
                res.send(App(Feedback(`Contact ${name} created!`)))
            }
        })

    })
})

app.get('/register', (req, res) => {
    res.send(App(Register()))
})

app.post('/register', (req, res) => {
    const {
        body
    } = req

    register(body, (error, userMatched) => {
        const {name} = body
        if(userMatched) res.send(App(Feedback(`This email already exists!`)))

        if (error) {
            res.send(App(Feedback("Fail:(", 'error')))

        } else {
            res.send(App(Feedback(`User ${name} created!`)))
        }
    })
})

app.get('/login', (req, res) => {
    res.send(App(Login()))
})

app.post('/login', (req, res) => {
    const {body} = req

    authenticateUser(body, (error, emailFound)=> {
        if(error) throw error

        !emailFound? res.send(App(Feedback("There was an error loging in"))) : res.send(App(Feedback("CONGRATS! LOGGED IN!")))
    })
})




/*
    } else if (url.startsWith('/search')) {
        if (!url.includes('?')) {
            res.end(App(SearchContacts()))
        } else {
            const [, queryString] = url.split('?')

            const [, query] = queryString.split('=')

            searchContacts(query, (error, contacts) => {
                if (error) throw error

                res.end(App(`${SearchContacts(query)}${ListContacts(contacts)}`))
            })
        }
    } else if (url === '/add-contact') {
        if (method === 'GET') {

            res.end(App(AddContact()))

        } else if (method==='POST'){
            
            req.on('data' , data =>{ 
                
                let obj = objetize(data, callback)
                addContact(obj, (error, id)=>{
                    const {name} = obj

                    if (error) {
                        res.end(App(Feedback("Fail:(",'error')))

                    }else {
                        res.end(App(Feedback(`Contact ${name} created!`)))
                    }
                })
            })
        }

    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            if (error) throw error

            res.setHeader('Content-Type', 'text/css')

            res.end(content)
        })
    } else {

    }
})  */

app.listen(8080)