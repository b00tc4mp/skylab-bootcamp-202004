const express = require('express')
const app = express()
const listContacts = require('./logic/list-contacts')
const ListContacts = require('./components/ListContacts')
const App = require('./components/App')
const searchContact = require('./logic/search-contacts')
const SearchContact = require('./components/SearchContacts')

app.use(express.static('public'))

app.get('/contacts', (req,res)=>{
    
    listContacts((error, contacts) => {
        if (error) throw error 
        
        res.send(App(ListContacts(contacts)))
    })
})
app.get('/search', (req,res)=>{
    
    const { url } = req
    if (!url.includes('?')){
        
        res.send(App(SearchContact()))
    
    } else {
        searchContact()
    }
})

app.get('/resgister', (req, res)=>{
    
})

app.listen(8080)