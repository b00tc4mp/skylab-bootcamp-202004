const express = require('express')
const app = express()
const AddContact = require('./components/AddContact')
const App = require('./components/App')
// const Landing = require('./')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const bodyParser = require('body-parser')
const addContact = require('./logic/add-contact')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
// express.urlencoded()
// app.get('/landing', (req, res)=> {
//     res.send(App(Landing()))
// })

app.get('/add-contact', (req, res) =>{

    res.send(App(AddContact()))   
})

app.post('/add-contact', (req, res) => {
    debugger
    console.log(req.body.name)
    const {body} = req
    addContact(body, (error, id) => {
        if(error) throw error
        
        res.send("Data send correctly")
    })        
})

app.get('/list', (req, res) => {
    
    res.send(App(ListContacts()))
})

app.get('/search', (req, res) => {
    
    res.send(App(SearchContacts()))

})




app.listen(8080)