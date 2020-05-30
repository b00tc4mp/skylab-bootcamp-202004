const http = require('http')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const App = require('./components/App')
const fs = require('fs')
const path = require('path')
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
            res.end(App(SearchContacts()))
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
            // TODO show form
        } else if (method === 'POST') {
            // TODO call add-contact logic and show some feedback
        } else {
            // TODO show some error (like "cannot <method>")
        }
    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            if (error) throw error

            res.setHeader('Content-Type', 'text/css')

            res.end(content)
        })
    } else if (url == '/wtf') {
        //req.pipe(res)

        let content = ''

        req.on('data', chunk => content += chunk)

        req.on('end', () => {
            console.log(content)

            res.end(content)
        })
    } else {
        const resource = path.join(__dirname, url)

        fs.access(resource, fs.F_OK, (err) => {
            if (err) {
                res.statusCode = 404

                res.end(App(NotFound404()))

                return
            }

            const extension = path.extname(resource).substring(1)

            res.setHeader('Content-Type', `image/${extension}`) // WARN! this only works for image files!

            fs.readFile(resource, (error, content) => {
                if (error) throw error
    
                res.end(content)
            })
        })
    }
})

server.listen(8080)

