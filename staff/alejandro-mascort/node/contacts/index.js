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
const NotFound404 = require('./components/NotFound404')

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
        const { method } = req

        if (method === 'GET') {
            res.end(App(AddContact()))
        } else if (method === 'POST') {
            req.on('data', chunk => {
                const _contact = extractInputs(chunk.toString())
                addContact(_contact, (error) => {
                    if (error) throw error
    
                    res.end(App('<h2>Contact Saved!</h2>'))
                })
            })
        } else {
            res.end(App('<h2>Incorrect method obtained :(</h2>'))
        }

    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            if (error) throw error

            res.setHeader('Content-type', 'text/css')

            res.end(content)
        })
    } else {
        const resource = path.join(__dirname, url)

        fs.access(resource, fs.F_OK, (err) => {
            if (err) {
                res.statusCode = 404
                res.end(App(NotFound404()))
            }
        })

        const extension = resource.extname(resource).substring(1)

        res.setHeader('content-type', `image/${extension}`)

        fs.readFile(resource,(error, content) => {
            if (error) throw error

            res.end(content)
        })
    }
})

server.listen(8080)