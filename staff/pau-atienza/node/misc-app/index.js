//Libraries
const express = require('express')
const app = express()

//Components
const App = require('./components/App')
const Home = require('./components/Home')
const Search = require('./components/Search')
const ListContacts = require('./components/ListContacts')
const AddContact = require('./components/AddContact')
const Feedback = require('./components/Feedback')
const ListStickies = require('./components/ListStickies')
const AddSticky = require('./components/AddSticky')
const Register = require('./components/Register')
const Login = require('./components/Login')

//Methods
const addContact = require('./logic/add-contact')
const registerUser = require('./logic/register-user')
const search = require('./logic/search')
const addSticky = require('./logic/add-sticky')
const listContacts = require('./logic/list-contacts')
const listStickies = require('./logic/list-stickies')
const authenticateUser = require('./logic/authenticate-user')
const uid = require('./utils/uid')

app.use(express.static('public'))

app.get('/contacts', (req, res) => {
    const cookie = req.header('cookie')

    if(!cookie) return res.redirect('/login')

    const {url} = req
    if (url.includes('?')){
        const [, queryString] = url.split('?')
        const [, query] = queryString.split('=')
        const [,id] = cookie.split('=')
        const string = "contacts"
        search(id, query, string,(error, contacts) => {
            if (error) throw error

            res.send(App(`${Search(string, query)}${ListContacts(contacts)}`))
        })
    }
    else{
        const [,id] = cookie.split('=')
        const string = "contacts"
        listContacts(id, (error, contacts)=>{
            if (error) res.send(App(`${Search(string)}${Feedback(error.message, 'error')}`))
            res.send(App(`${Search(string)}${ListContacts(contacts)}`))
        })
    }       
})

app.get('/add-contact',(req, res)=>{
    const cookie = req.header('cookie')

    if(!cookie) return res.redirect('/login')
    else res.send(App(AddContact()))
})

app.post('/add-contact',(req, res)=>{
    const cookie = req.header('cookie')

    if(!cookie) return res.redirect('/login')

    req.on('data' , data =>{
        
        const arrList = data.toString().replace('%40','@').split('&')

        let contact = {};
        arrList.forEach(element =>{
            const split = element.split('=')
            contact[split[0]] = split[1]
        })
        const [,id] = cookie.split('=')
        contact.id = id
        
        addContact(contact, (error,id)=>{
            if(error){res.send(App(Feedback("Fail:(",'error')))
            }else{
                const {name} = contact
                res.send(App(AddContact() + Feedback(`Contact ${name} created!`)))
            }
        })
    })                
})

app.get('/stickies', (req, res) => {
    const cookie = req.header('cookie')

    if(!cookie) return res.redirect('/login')

    const {url} = req
    if (url.includes('?')){
        const [, queryString] = url.split('?')
        const [, query] = queryString.split('=')
        const [,id] = cookie.split('=')
        const string = "stickies"
        search(id, query, string,(error, stickies) => {
            if (error) throw error

            res.send(App(`${Search(string, query)}${ListStickies(stickies)}`))
        })
    }
    else{
        const [,id] = cookie.split('=')
        listStickies(id, (error, stickies)=>{
            const string = "stickies"
            if (error) res.send(App(`${Search(string)}${Feedback(error.message, 'error')}`))
            res.send(App(`${Search(string)}${ListStickies(stickies)}`))
        })
    }       
})



app.get('/register', (req, res)=>{
    
    res.send(App(Register()))
})

app.post('/register',(req, res)=>{
    req.on('data' , data =>{
        const arrList = decodeURIComponent(data.toString()).split('&')

        let obj = {};
        arrList.forEach(element =>{
            const split = element.split('=')
            obj[split[0]] = split[1]
        })

        registerUser(obj, (error,id)=>{
            if(error){res.send(App(Feedback("Fail:(",'error')))
            }else{
                const {username} = obj
                res.send(App(Feedback(`User ${username} created!`)))
            }
        })
    })                
})

app.get('/login', (req, res)=>{
    res.send(App(Login()))
})

app.post('/login',(req, res)=>{

    req.on('data' , data =>{
        const arrList = decodeURIComponent(data.toString()).split('&')

        let obj = {};
        arrList.forEach(element =>{
            const split = element.split('=')
            obj[split[0]] = split[1]
        })

        authenticateUser(obj, (error,user)=>{
            if(error){res.send(App(Feedback("Fail:(",'error')))
            }else if (!user){
                res.send(App(Feedback("Wrong e-mail or password",'warning')))
            }else{
                const {username, id} = user
                
                res.cookie(`${username}`, id)
                res.redirect('/home')
            }
        })
    })                
})

app.get('/home', (req, res) =>{
    const cookie = req.header('cookie')

    if(!cookie) return res.redirect('/login')
    
    const [username, id] = cookie.split('=')

    if (!id) return res.redirect('/login')
    
    res.send(App(Home(username)))
})

app.get('/add-sticky',(req, res)=>{
    const cookie = req.header('cookie')

    if(!cookie) return res.redirect('/login')

    res.send(App(AddSticky()))
})

app.post('/add-sticky',(req, res)=>{
    const cookie = req.header('cookie')

    if(!cookie) return res.redirect('/login')

    req.on('data' , data =>{
        
        const arrList = data.toString().split('&')

        let sticky = {};
        arrList.forEach(element =>{
            const [key, value] = element.split('=')
            sticky[key] = decodeURIComponent(value.split('+').join(' '))
        })
        
        const [,id] = cookie.split('=')
        sticky.id = id

        addSticky(sticky, (error)=>{
            if(error){res.send(App(Feedback("Fail:(",'error')))
            }else{
                const {tag} = sticky
                res.send(App(Feedback(`Sticky "${tag}" created!`)))
            }
        })
    })
})

app.post('/logout', (req, res) => {
    res.clearCookie('userId')

    res.redirect('/login')
})

app.listen(8080)

// const http = require('http')
// const fs = require('fs')
// const path = require('path')

// const server = http.createServer((req, res) => {

//     const { url , method, header} = req

//     res.setHeader('content-type', 'text/html')

//     if (url === '/contacts') {
//         listContacts((error, contacts) => {
//             if (error) throw error

//             res.end(App(ListContacts(contacts)))
//         })
//     } else if (url.startsWith('/search')) {
//         if (!url.includes('?')) {

//             res.end(SearchContacts())
//         } else {
//             const [, queryString] = url.split('?')

//             const [, query] = queryString.split('=')

//             searchContacts(query, (error, contacts) => {
//                 if (error) throw error

//                 res.end(App(`${SearchContacts(query)}${ListContacts(contacts)}`))
//             })
//         }
//     } else if (url === '/add-contact') {

//         if(method === 'GET'){
//             res.end(App(AddContact()))

//         }else if(method==='POST'){

//             req.on('data' , data =>{
//                 const arrList = data.toString().replace('%40','@').split('&')

//                 let obj = {};
//                 arrList.forEach(element =>{
//                     const split = element.split('=')
//                     obj[split[0]] = split[1]
//                 })
//                 addContact(obj, (error,id)=>{
//                     const {name} = obj

//                     if(error){
//                         res.end(App(Feedback("Fail:(",'error')))
//                     }else{
//                         res.end(App(Feedback(`Contact ${name} created!`)))
//                     }
//                 })
//             })                
//         }
//     } else if (url === '/list-contacts'){
//         listContacts((error, contacts)=>{
//             if(error) res.end(App(Feedback(error.message,'error')))

//             else res.end(App(ListContacts(contacts)))
//         })
//     } else if (url === '/style.css') {
//         fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
//             if (error) throw error

//             res.setHeader('Content-Type', 'text/css')

//             res.end(content)
//         })
//     } else if (url === '/add-sticky'){
//         if(method === 'GET'){
//             res.end(App(AddSticky()))

//         }else if(method === 'POST'){

//             req.on('data' , data =>{
//                 const arrList = data.toString().split('&')

//                 let obj = {};
//                 arrList.forEach(element =>{
//                     const split = element.split('=')
//                     obj[split[0]] = decodeURIComponent(split[1].split('+').join(' '))
//                 })
//                 addSticky(obj, (error,id)=>{
//                     const {tag} = obj

//                     if(error){
//                         res.end(App(Feedback("Fail:(",'error')))
//                     }else{
//                         res.end(App(Feedback(`Sticky ${tag} created!`)))
//                     }
//                 })
//             })
//         }
//     } else if (url === '/list-stickies'){
//         listStickies((error, stickies)=>{

//             if(error) res.end(App(Feedback(error.message,'error')))
//             else res.end(App(ListStickies(stickies)))
//         })
//     } else {
//         res.end(App(Feedback("404 Not Found",'error')))
//     }
// })

// server.listen(8080)