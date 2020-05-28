const http = require('http')
const fs = require('fs')
const path = require('path')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contact')
const addContact = require('./logic/add-contact')
const addSticky = require('./logic/add-sticky')
const listStickies = require('./logic/list-stickies')
const App = require('./components/App')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const AddContact = require('./components/AddContact')
const AddSticky = require('./components/AddSticky')
const ListStickies = require('./components/ListStickies')
const Landing = require('./components/Landing')
const Feedback = require('./components/Feedback')
const objetize = require('./helpers/objetize')


const server = http.createServer((req, res) => {
    const { url, method } = req

    res.setHeader('content-type', 'text/html')

    if (url === '/landing') {
        res.end(App(Landing()))

    } else if (url === '/contacts') {
        listContacts((error, contact) => {
            if (error) throw error

            res.end(App(ListContacts(contact)))
        })
    } else if (url.startsWith('/search')) {
        if (!url.includes('?')) {
            res.end(App(SearchContacts()))

        } else {
            const [, queryString] = url.split('?')
            const [, query] = queryString.split('=')

            searchContacts(query, (error, contacts) => {
                if (error) res.end(App(Feedback(error.message, 'error')))

                res.end(App(`${SearchContacts(query)}${ListContacts(contacts)}`))
            })
        }
    } else if (url === '/add-contact') {
        if (method === 'GET') {
            res.end(App(AddContact()))

        } else if (method === 'POST') {
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
        }
    } else if (url === '/add-sticky') {
        if (method === 'GET') {
            res.end(App(AddSticky()))

        } else if (method === 'POST') {
            req.on('data', data => {
                const sticky = objetize(data)

                addSticky(sticky, (error, id) => {
                    if (error) {
                        res.end(App(Feedback(error.message, 'error')))
                    } else {
                        res.end(App(Feedback(`Sticky created!`)))
                    }
                })
            })
        }

    } else if (url === '/stickies') {
        listStickies((error, sticky) => {
            if (error) throw error

            res.end(App(ListStickies(sticky)))
        })
    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            if (error) throw error

            res.setHeader('Content-Type', 'text/css')

            res.end(content)
        })
    } else {
        res.end(App(Feedback('Not found :(')))
    }

    res.on('error', console.log)
})

server.listen(8080)