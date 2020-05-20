const http = require('http')
const fs = require('fs')
const path = require('path')
const listContacts = require('./logic/list-contacts')
const ListContacts = require('./components/ListContacts')
const App = require('./components/App')
const SearchContacts = require('./components/SearchContacts')
const searchContacts = require('./logic/search-contacts')
const AddContact = require('./components/AddContact')
const addContact = require('./logic/add-contact')
const extractInputs = require('./logic/extract-inputs')

const server = http.createServer((req, res) => {
    const { url } = req

    res.setHeader('content-type', 'text/html')

    if (url === '/contacts') {
        listContacts((error, contacts) => {
            if (error) throw error 

            res.end(App(ListContacts(contacts)))
        })

    } else if (url.startsWith('/search')) {
        if (!url.includes('?')) {
            res.end(SearchContacts())
        } else {
            const [, queryString] = url.split('?')
            const [, query] = queryString.split('=')

            searchContacts(query, (error, contacts) => {
                if (error) throw error

                res.end(App(`${SearchContacts(query)}${ListContacts(contacts)}`))
            })
        }
    } else if (url.startsWith('/add-contact')) {
        
        if (!url.includes('&')) {
            res.end(App(AddContact()))
        } else {
            const _contact = extractInputs(url)
            addContact(_contact, (error) => {
                if (error) throw error

                res.end(App('<h2>Contact Saved!</h2>'))
            })
        }

    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            if (error) throw error

            res.setHeader('Content-type', 'text/css')

            res.end(content)
        })
    } else {
        res.end(App('<h2>Cannot found the requested page :(</h2>'))
    }
})

server.listen(8080)