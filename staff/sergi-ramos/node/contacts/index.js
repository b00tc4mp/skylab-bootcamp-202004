const http = require('http')
const fs = require('fs')
const path = require('path')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const ListContacts = require('./components/ListContacts')
const Landing = require('./components/Landing')
const SearchContacts = require('./components/SearchContacts')
const App = require('./components/App')
const AddContact = require('./components/AddContact')
const addContact = require('./logic/add-contact')
const AddStickies = require('./components/AddStickies')
const addSticky = require('./logic/add-sticky')


const server = http.createServer((req, res) => {
    const { url, method } = req

    res.setHeader('content-type', 'text/html')

    if (url === '/landing') {
        res.end(App(Landing()))
    }

    if (url === '/contacts') {

        listContacts((error, contacts) => {
            if (error) throw error

            res.end(App(ListContacts(contacts)))
        })
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
    } else if (url.startsWith('/add-contact')) {
        if (method === 'GET') {
            res.end(App(AddContact()))
        }

        req.on(('data'), (chunk) => {

            const values = chunk.toString().split("&")
            const contact = {}

            values.forEach(value => {
                contact[value.split("=")[0]] = value.split('=')[1]
            })

            contact.email = decodeURIComponent(contact.email)
            addContact(contact, (error, id) => {
                res.end(App(AddContact()))
            })
        })

    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            if (error) throw error

            res.setHeader('Content-Type', 'text/css')

            res.end(content)
            debugger
        })
    } else if (url === '/add-sticky') {

        if (method === 'GET') {

            res.end(App(AddStickies()))

        } else if (method === 'POST') {

            req.on('data', chunk => {

                const values = chunk.toString().split("&")
                const sticky = {}

                values.forEach(value => {
                    sticky[value.split("=")[0]] = value.split('=')[1]
                    sticky.comment = decodeURIComponent(sticky.comment)
                    sticky.name = decodeURIComponent(sticky.name)
                })
                debugger
                addSticky(sticky, (error) =>{
                    if(error) throw error
                })
            })

        }
    }
})

server.listen(8080)
