const express = require('express')
const app = express()
const listContacts = require('./logic/list-contacts')
const ListContacts = require('./components/ListContacts')
const App = require('./components/App')
const addContact = require('./logic/add-contact')
app.use(express.static('public'))
const {url}=req
app.get('/contacts', (req,res)=>{

    listContacts((error, contacts) => {
        if (error) throw error 

        res.send(App(ListContacts(contacts)))
    })
})
app.get('/search', (req,res)=>{
    
    if (searchContact()
})

app.listen(8080)