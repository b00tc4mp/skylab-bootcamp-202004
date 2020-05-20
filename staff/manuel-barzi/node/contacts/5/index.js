const http = require('http')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')

const server = http.createServer((req, res) => {
    const { url } = req

    res.setHeader('content-type', 'text/html')

    if (url === '/contacts') {
        listContacts((error, contacts) => {
            if (error) throw error

            res.end(ListContacts(contacts))
        })
    } else if (url.startsWith('/search')) {
        if (!url.includes('?')) {
            res.end(SearchContacts())
        } else {
            const [, queryString] = url.split('?')

            const [, query] = queryString.split('=')

            searchContacts(query, (error, contacts) => {
                if (error) throw error
              
                res.end(`${SearchContacts(query)}${ListContacts(contacts)}`)
            })
        }
    } else if (url === '/add-contact') {

    } else {

    }
})

server.listen(8080)

