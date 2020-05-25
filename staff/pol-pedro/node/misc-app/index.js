const express = require("express")
const bodyParser= require("body-parser")
const app= express();
const fs= require("fs")
const path = require("path")


const App = require("./components/App")
const ListContacts = require("./components/ListContacts")
const listContacts = require("./logic/list-contacts")
const SearchContacts = require("./components/SearchContacts")
const searchContacts = require("./logic/search-contacts")
const AddContact = require("./components/AddContact")
const addContact = require("./logic/add-contact")
const RegisterUser = require("./components/Register")
const registerUser = require("./logic/register-user")
const Login=require("./components/Login")
const login = require('./logic/login-user')
const Landing = require("./components/Landing")
const Home = require("./components/Home")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.send(App(Landing()))
})

app.get('/home', (req,res) => {

    res.send(App(Home()))
})

app.get("/list-contacts",(req,res)=>{
    listContacts((error,contacts)=>{
        if(error){
            throw error
        }
        res.send(App(ListContacts(contacts)))
    })

})

app.get("/search", (req, res)=>{
    if(!req.url.includes('?')){
        res.send(App(SearchContacts()))
    }else{

        const [, queryString] = req.url.split('?')
        const [, query] = queryString.split('=')

        searchContacts(query, (error, contacts) => {
            res.send(App(`${SearchContacts(query)}${ListContacts(contacts)}`))
        })
    }
})
app.get("/add-contact",(req,res)=>{
    res.send(App(AddContact()))
})
app.post("/add-contact",(req,res)=>{
    const {body}= req
    console.log(body.name+body.surname+body.email+body.phone)
    addContact(body, (error, id) => {
        if(error){
            throw (error)
        }else {
            res.send(App(AddContact()))
        }
    })

    //const {name}
    // req.on("data",(chunk)=>{
    //     console.log(chunk.toString())
    //     const [name,surname,email,password]=chunk.toString().split("&")
    //     res.send(App(AddContact()))
    // })
})

app.get("/register", (req, res) => {
    res.send(App(Landing()+RegisterUser()))
})
app.post("/register",(req,res)=>{
    const {body} = req
    registerUser(body,(error)=>{
        if(error){
            throw (error)
        }else{
            console.log(body.name+body.surname+body.email+body.phone)

            res.redirect('/login')
            // console.log('change url: ' + req.url)
        }

    })
})

app.get("/login", (req, res) => {
    res.send(App(Landing()+Login()))
})

app.post("/login", (req, res) => {
    const {body: {email, password}} = req
    login(email, password, (error, id) =>{
        if (error) throw (error)

        if(id){
            res.cookie('userId', id)
            res.redirect('/home')
        }
    })
})



app.get("/style.css",(req,res)=>{
    fs.readFile(path.join(__dirname,"style.css"),"utf8",(error,content)=>{
        if(error) throw error
        res.setHeader("Content-Type","text/css")
        res.end(content)
    })
})
/*
else if (url === '/style.css') {
    fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
        if (error) throw error

        res.setHeader('Content-Type', 'text/css')

        res.end(content)
    })
    */

app.listen(8080)