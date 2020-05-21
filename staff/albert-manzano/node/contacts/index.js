const http = require('http')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const addContact = require('./logic/add-contact')
const ListContacts = require('./components/ListContacts')
const SearchContacts = require('./components/SearchContacts')
const AddContact = require('./components/AddContact')
const Landing = require('./components/Landing')
const App = require('./components/App')
const fs = require('fs')
const path = require('path')
const Feedback = require('./components/Feedback')
const objectize = require('./helper/objectize')
const AddSticky = require('./components/AddSticky')
const addSticky = require('./logic/add-sticky')
const ListStickies = require('./components/List-stickies')


const server = http.createServer((req, res) => {
    const {
        url,
        method
    } = req
    
    res.setHeader('content-type', 'text/html')


    if (url === '/contacts') {
        listContacts((error, contacts) => {
            if (error) throw error
            debugger
            res.end(App(ListContacts(contacts)))
        })

    } else if (url.startsWith('/search')) {
        if (!url.includes('?')) {
            res.end(App(SearchContacts()))
        } else {
            
            const [ , queryString] = url.split('?')

            const [, query] = queryString.split('=')

            searchContacts(query, (error, contacts) => {
                if (error) throw error

                res.end(App(`${SearchContacts(query)}${ListContacts(contacts)}`)                )
            })
        }
	}else if(url === '/stickies'){
		if (method === 'GET') {

            res.end(App(AddSticky()))

        }else if(method==='POST'){
            
            req.on('data' , data =>{ 
                
                let obj = objectize(data)
                addSticky(obj, (error)=>{
                    const {message} = obj

                    if(error){
                        res.end(App(Feedback("Fail:(",'error')))
                    }else{
                        res.end(App(Feedback(`message ${message} created!${ListStickies(stickies)}`)))
                    }
                })
            })
        }
	
	}else if (url === '/add-contact') {
        if (method === 'GET') {

            res.end(App(AddContact()))


        }else if(method==='POST'){
            
            req.on('data' , data =>{ 
                
                let obj = objectize(data, callback)
                addContact(obj, (error, id)=>{
                    const {name} = obj

                    if(error){
                        res.end(App(Feedback("Fail:(",'error')))
                    }else{
                        res.end(App(Feedback(`Contact ${name} created!`)))
                    }
                })
            })
        }

    } else if (url === '/landing') {
        res.end(App(Landing()))

    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            // if (error) throw error

            res.setHeader('Content-Type', 'text/css')

            res.end(content)
        })
    } else {

    }
})

server.listen(8080)