const express = require('express')
const { App, Register, Login, Home, Landing } = require('./components')
const { register, authenticateUser, retrieveUser } = require('./logic')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const addContact = require('./logic/add-contact')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const AddContact = require('./components/AddContact')
const Feedback = require('./components/Feedback')
const objetize = require('./helper/objetize')

const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))


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

app.get('/register', (req, res) => res.send(App(Register())))

app.post('/register', (req, res) => {
    const { body } = req

    register(body, (error, userMatched) => {
        if(userMatched) res.send(App(Feedback(`This email already exists!`)))

        if (error) {
            res.send(App(Feedback("Fail:(", 'error')))

        } else {
            res.send(App(Login))
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

        !emailFound? res.send(App(Feedback("There was an error loging in"))) : res.send(App(Home()))
    })
})
app.listen(8080)