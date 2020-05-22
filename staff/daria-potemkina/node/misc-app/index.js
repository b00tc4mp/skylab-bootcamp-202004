const express = require('express')
const fs = require('fs')
const path = require('path')
// const Compo = require("./public/components/Compo")
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contact')
const addContact = require('./logic/add-contact')
// const addSticky = require('./public/logic/add-sticky')
// const listStickies = require('./public/logic/list-stickies')
const App = require('./components/App')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const AddContact = require('./components/AddContact')
// const AddSticky = require('./public/components/AddSticky')
// const ListStickies = require('./publicpublic/components/ListStickies')
// const Landing = require('./public/components/Landing')
const Feedback = require('./components/Feedback')
const objetize = require('./helpers/objetize')

const app = express()

app.use(express.static('public'))


// app.use('/components', express.static('public'))

// app.use(express.static('/logic'))

app.get('/contacts', (req, res) => {
    listContacts((error, contacts) => {
        if (error) throw error
        res.send(App(ListContacts(contacts)))
    })

})
// app.get('/search', (req, res) =>{
//     res.send(App(SearchContacts()))


// })



app.get('/add-contact', (req, res) => {
    res.end(App(AddContact()))
})
app.post('/add-contact', (req, res) => {

    req.on('data', data => {
        const obj = objetize(data)

        addContact(obj, (error, id) => {
            const { name } = obj

            if (error) {
                res.end(App(Feedback(error.message, 'error')))
            } else {
                res.end(App(Feedback(`Contact ${name} created!`)))
            }
        })
    })


    res.end()
})

// app.post('/add-contact', (req, res) => {

//     req.on('data', data => {

//         const obj = objetize(data)

//         addContact(obj, (error, id) => {
//             const { name } = obj

//             if (error) {
//                 res.end(App(Feedback(error.message, 'error')))
//             } else {
//                 res.end(App(Feedback(`Contact ${name} created!`)))
//             }
//         })
//     })
// })
// app.get('/add-sticky', (req, res) => {
//     res.end(App(AddSticky()))
// })

app.listen(8080)