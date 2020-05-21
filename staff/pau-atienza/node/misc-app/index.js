//Libraries
const express = require('express')
const app = express()

//Components
const App = require('./components/App')
const SearchContacts = require('./components/SearchContacts')
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
const searchContacts = require('../misc-app/logic/search-contacts')
const addSticky = require('./logic/add-sticky')
const listContacts = require('./logic/list-contacts')
const listStickies = require('./logic/list-stickies')
const authenticateUser = require('./logic/authenticate-user')

app.use(express.static('public'))

app.get('/hello-world', (req, res) => {
    res.send(App(`hola mundo!!!
<form method = "POST">
<input type = "text"  name = "hola">
</form>`))
})

app.post('/hello-world', (req, res) => {
    res.send('ok, post received')
})

app.get('/search', (req, res) => {
    
    const {url} = req
    if (url.includes('?')){
        const [, queryString] = url.split('?')
        const [, query] = queryString.split('=')

        searchContacts(query, (error, contacts) => {
            if (error) throw error

            res.send(App(`${SearchContacts(query)}${ListContacts(contacts)}`))
        })
    }
    else res.send(App(SearchContacts()))       
})
app.get('/add-contact',(req, res)=>{
    res.send(App(AddContact()))
})

app.post('/add-contact',(req, res)=>{
    req.on('data' , data =>{
        const arrList = data.toString().replace('%40','@').split('&')

        let obj = {};
        arrList.forEach(element =>{
            const split = element.split('=')
            obj[split[0]] = split[1]
        })

        addContact(obj, (error,id)=>{
            const {name} = obj

            if(error){
                res.send(App(Feedback("Fail:(",'error')))
            }else{
                res.send(App(Feedback(`Contact ${name} created!`)))
            }
        })
    })                
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
            const {username} = obj

            if(error){
                res.send(App(Feedback("Fail:(",'error')))
            }else{
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
            const {username, id} = user
            if(error){
                res.send(App(Feedback("Fail:(",'error')))
            }else if (!user){
                res.send(App(Feedback("Wrong e-mail or password",'warning')))
            }else{
                res.send(App(Feedback(`You were successfully authenticated as ${username}!`)))
            }
        })
    })                
})

app.get('/add-sticky',(req, res)=>{
    res.send(App(AddSticky()))
})

app.post('/add-sticky',(req, res)=>{
    req.on('data' , data =>{
        
        const arrList = data.toString().split('&')

        let obj = {};
        arrList.forEach(element =>{
            const [key, value] = element.split('=')
            obj[key] = decodeURIComponent(value.split('+').join(' '))
        })
        addSticky(obj, (error,id)=>{
            const {tag} = obj

            if(error){
                res.send(App(Feedback("Fail:(",'error')))
            }else{
                res.send(App(Feedback(`Sticky "${tag}" created!`)))
            }
        })
    })
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