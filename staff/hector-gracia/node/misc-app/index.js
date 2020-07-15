const express = require("express")
const bodyParser= require("body-parser")
const app= express();
const fs= require("fs")
const path = require("path")


const App=require("./components/App")
const ListContacts=require("./components/ListContacts")
const listContacts=require("./logic/list-contacts")
const SearchContacts=require("./components/SearchContacts")
const searchContacts=require("./logic/search-contacts")
const AddContact=require("./components/AddContact")
const addContact=require("./logic/add-contact")
const RegisterUser=require("./components/Register")
const registerUser=require("./logic/register-user.js")
const Login=require("./components/Login")
const authenticateUser=require("./logic/authenticate-user")
const retrieveUser=require("./logic/retrieve-user")
const ListStickies= require("./components/ListSticky")
const listStickies=require("./logic/list-stickies")
const AddSticky=require("./components/AddSticky")
const addSticky=require("./logic/add-sticky")
const Home=require("./components/Home")
const Feedback=require("./components/Feedback")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))

app.get("/hello-world",(req,res)=>{
    res.send(App("<h1>Hola mundo</h1>"))
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
    const cookie= req.header("cookie");
    if(!cookie) return res.redirect("/login");
    const [,userId]=cookie.split("=");
    if(!userId) return res.redirect("/login")
    res.send(App(AddContact()))
})
app.post("/add-contact",(req,res)=>{
    const cookie= req.header("cookie");
    if(!cookie) return res.redirect("/login");
    const [,userId]=cookie.split("=");
    if(!userId) return res.redirect("/login")

    const {body}= req
    const {name,surname,email,phone}= body
    try{
        addContact(userId,{name,surname,email,phone},(error,contactId)=>{//TODO hacer que tras crear el contacto te lleve al contact info directamente aprovechando el contactId
            if(error) return res.send(App(Feedback(error.message)));
            res.redirect("/list-contacts");
        })
    }catch(error){
        res.send(App(Feedback(error.message)));
    }
})
app.get("/list-contacts",(req,res)=>{
    const cookie= req.header("cookie");
    if(!cookie) return res.redirect("/login");
    const [,userId]=cookie.split("=");
    if(!userId) return res.redirect("/login")
    try{
        listContacts(userId,(error,contacts)=>{
            if(error) return res.send(App(AddContact()));
            res.send(App(ListContacts(contacts)));
        })
    }catch(error){
        res.send(App(Feedback(error.message)));
    }
})
app.get("/list-stickies",(req,res)=>{
    const cookie= req.header("cookie");
    if(!cookie) return res.redirect("/login");
    const [,userId]=cookie.split("=");
    if(!userId) return res.redirect("/login")
    try{
        listStickies(userId,(error,stickies)=>{
            if(error) return res.send(App(Feedback(error.message)));
            res.send(App(ListStickies(stickies)));
        })
    }catch(error){
        res.send(App(Feedback(error.message)));
    }
})
app.get("/add-sticky",(req,res)=>{
    const cookie= req.header("cookie");
    if(!cookie) return res.redirect("/login");
    const [,userId]=cookie.split("=");
    if(!userId) return res.redirect("/login");
    res.send(App(AddSticky()));
})
app.post("/add-sticky",(req,res)=>{
    const cookie= req.header("cookie");
    if(!cookie) return res.redirect("/login");
    const [,userId]=cookie.split("=");
    if(!userId) return res.redirect("/login");
    const {body}= req
    const {title,description}= body
    try{
        addSticky(userId,{title,description},(error)=>{
            if(error) return res.send(App(Feedback(error.message)));
            res.redirect("/list-stickies")
        })
    }catch(error){
        res.send(App(Feedback(error.message)));
    }
})
app.get("/register", (req, res) => {
    const cookie =req.header("cookie")
    if(cookie){
        const [, userId] = cookie.split('=')
        try{
            retrieveUser(userId,(error)=>{
                if(error){ 
                    res.clearCookie('userId');
                    res.send(App(RegisterUser()));
                }
                else{
                    res.redirect("/home");
                }
            })
        }catch(e){
            res.clearCookie('userId');
            res.send(App(RegisterUser()));
        }
    }else{
        res.send(App(RegisterUser()));
    }
})
app.post("/register",(req,res)=>{
    const {body} = req
    try{
        registerUser(body,(error,userId)=>{//Que te mande directamente al home tras un registro exitoso
            if(error) return res.send(App(Feedback(error.message)));
            res.redirect("/login")

        })
    }catch(error){
        res.send(App(Feedback(error.message)));
    }
})
app.get("/login", (req, res) => {
    const cookie =req.header("cookie")
    if(cookie){
        const [, userId] = cookie.split('=')
        try{
            retrieveUser(userId,(error)=>{
                if(error){ 
                    res.clearCookie('userId');
                    res.send(App(Login()))
                }
                else{
                    res.redirect("/home");
                }
            })
        }catch(e){
            res.clearCookie('userId');
            res.send(App(Login()));
        }
    }else{
        res.send(App(Login()));
    }
    
})
app.post("/login",(req,res)=>{
    const{body}=req;
    try{
        authenticateUser(body.email,body.password,(error,userId)=>{
            //Meter cookie e ir a home
            if(error) return res.send(App(Feedback(error.message)));
            res.cookie("userId",userId);
            res.redirect("/home")
        })
    }catch(e){
        res.send(App(Feedback(error.message)));
    }
})
app.get("/home",(req,res)=>{
    const cookie= req.header("cookie");
    if(!cookie) return res.redirect("/login");
    const [,userId]=cookie.split("=");
    if(!userId) return res.redirect("/login")
    try{
        retrieveUser(userId,(error,user)=>{
            if(error) return res.send(App(Feedback(error.message)));
            res.send(App(Home(user.name)))
        })
    }catch(error){
        res.send(App(Feedback(error.message)));
    }
})
app.post("/logout",(req,res)=>{
    res.clearCookie('userId')
    res.redirect("/login")
})
app.get("/style.css",(req,res)=>{
    fs.readFile(path.join(__dirname,"style.css"),"utf8",(error,content)=>{
        if(error) throw error
        res.setHeader("Content-Type","text/css")
        res.end(content)
    })
})
app.listen(8080)