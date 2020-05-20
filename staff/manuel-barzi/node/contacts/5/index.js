const http = require('http')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const App = require('./components/App')
const fs = require('fs')
const path = require('path')

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
    } else if (url === '/add-contact') {

    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            if (error) throw error

            res.setHeader('Content-Type', 'text/css')

            res.end(content)
        })
    } else {

    }
})

server.listen(8080)

