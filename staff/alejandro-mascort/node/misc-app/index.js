const express = require('express')
const path = require('path')
//LOGIC
const register = require('./logic/register-user')
const authenticated = require('./logic/authenticate-user')
const retrieveUser = require('./logic/retrieve-user')
const addContact = require('./logic/add-contact')
const listContact = require('./logic/list-contacts')
const removeContacts = require('./logic/remove-contact')
const searchContacts = require('./logic/search-contacts')
const addStickie = require('./logic/add-stickie')
const listStickies = require('./logic/list-stickies')
const removeStickies = require('./logic/remove-stickie')
const searchStickies = require('./logic/search-stickies')
require('./utils/polyfills/string');

const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const parseBody = bodyParser.urlencoded({ extended: false })

const cookieSession = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } // WARN this does not make it work => RTFM!
    cookie: {},
    store: new FileStore({
        path: path.join(__dirname, 'data', 'sessions')
    })
})

const app = express()

app.set('view engine', 'pug')
app.set('views', './components')


app.use(express.static('public'))

app.get('/', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Landing', {cookiesAccepted})
})

app.post('/accept-cookies', cookieSession, (req, res) => {
    const { session } = req

    session.cookiesAccepted = true

    session.save(error => {
        if (error) throw error

        res.redirect(req.header('referer'))
    })
})

//////////
//REGISTER
//////////
app.get('/register', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')
    
    res.render('Register', {cookiesAccepted})
})

app.post('/register', parseBody, cookieSession, (req, res) => {
    const { body, session } = req 
    
    try {
        register(body, error => {
            if (error) return res.render('Register',{ cookiesAccepted: session.cookiesAccepted, feedback: true, message:error.message })
            
            res.redirect('/login')
        })
    } catch ({message}) {
        res.render('Register',{ cookiesAccepted: session.cookiesAccepted, feedback: true, message:message })
        return
    }   
})

//////////
//LOGIN
//////////
app.get('/login', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')
    
    res.render('Login',{ cookiesAccepted })
})

app.post('/login', parseBody, cookieSession, (req, res) => {
    const { body, session } = req

    try{
        authenticated(body,(error,userId)=>{    
            if (error) return  res.render('Login',{ cookiesAccepted: session.cookiesAccepted, feedback: true, message:error.message })

            session.userId = userId

            session.save(error => {
                if (error) throw error //TODO handle error

                res.redirect('/home')
            })
            
        }) 
    }catch({message}){
        res.render('Login',{ cookiesAccepted: session.cookiesAccepted, feedback: true, message:message })
        return 
    }
       
})

//////////
//HOME
//////////
app.get('/home', cookieSession, (req,res) => {
    const { session: { userId, cookiesAccepted } } = req

    if (!userId) return res.redirect('/login')

    try {
        retrieveUser(userId, (error, { name }) => {
            if (error) return  res.render('Home',{ cookiesAccepted, feedbackHome: true, message:error.message })
    
            res.render('Home', {cookiesAccepted, name})
        })
    } catch ({message}) {
        res.render('Home',{ cookiesAccepted, feedbackHome: true, message: message })
        return
    }
})


app.post('/logout', cookieSession, (req, res) => {
    const { session } = req

    session.destroy( error => {
        if (error) throw error //TODO handle error
        debugger
        res.redirect('/login')
    })
})

//////////
//CONTACT
/////////
// **********Add-contact***********************************************
app.get('/add-contact',  cookieSession, (req, res) => {
    const { session : {  cookiesAccepted, userId }} = req

    if (!userId) return res.redirect('/login')

    res.render('AddContact', {cookiesAccepted})
})


// **********Add-contact-POST***********************************************
app.post('/add-contact', parseBody,  cookieSession, (req, res) => {
    const { session : {  cookiesAccepted, userId}, body } = req
debugger
    if (!userId) return res.redirect('/login')  
        
    body.birthdate = decodeURIComponent(body.birthdate)

    try {
        addContact(userId, body, (error, contactId) => {

            if (error) return res.render('AddContact',{ cookiesAccepted, feedback: true, message:error.message })
    
            res.render('AddContact',{ cookiesAccepted, feedback: true, message:'Contact Saved!' })
        })
    } catch ({message}) {
        res.render('AddContact',{ cookiesAccepted, feedback: true, message:message })
        return
    }
    
       
})
// **********LIST-contact***********************************************
app.get('/contacts',  cookieSession, (req,res)=>{
    const { session : {  cookiesAccepted, userId} } = req

    if (!userId) return res.redirect('/login')

    try {
        listContact(userId,(error,contacts)=>{
            if(error) return res.render('Home',{ cookiesAccepted, feedback: true, message:error.message})

            return res.render('Home',{ cookiesAccepted, contacts})
        })
        
    } catch ({message}) {
        res.render('Home',{ cookiesAccepted, feedback: true, message })
        return
    }
    
})
// **********LIST-contact-POST***********************************************
app.post('/contacts', parseBody, cookieSession, (req,res)=>{
    const { session : {  cookiesAccepted, userId}, body } = req

    if (!userId) return res.redirect('/login')

    try {
        removeContacts(userId, body.contactId,(error, contacts)=>{
            if(error) return res.render('Home',{ cookiesAccepted, feedback: true, message:error.message})

            res.redirect('/contacts')
        })
        
    } catch ({message}) {
        res.render('Home',{ cookiesAccepted, feedback: true, message})
        return
    }
        
})
// **********Search-contact-GET***********************************************
app.get('/search-contacts', cookieSession, (req,res) => {
    const { session : {  cookiesAccepted, userId }, url } = req

    if (!userId) return res.redirect('/login')
debugger
    if (url.includes('?')) {
        const [, queryString] = url.split('?')
        const [, query] = queryString.split('=')   

        try {
            searchContacts(userId, query,(error,contacts)=>{
                
                if (error) return res.render('SearchContacts',{ cookiesAccepted, feedback: true, message:error.message})

                return res.render('SearchContacts',{ cookiesAccepted, contacts})
            })
            
        } catch ({message}) {
            res.render('SearchContacts',{ cookiesAccepted, feedback: true, message })
            return
        }
    } else {
        res.render('SearchContacts',{ cookiesAccepted })
    }
})


//////////
//STICKIE
/////////

// **********ADD-stickie***********************************************
app.get('/add-stickie', cookieSession, (req, res) => {
    const { session : {  cookiesAccepted, userId }} = req

    if (!userId) return res.redirect('/login')

    res.render('AddStickie', {cookiesAccepted})
})

// **********ADD-stickie-POST***********************************************
app.post('/add-stickie', parseBody, cookieSession,(req, res) => {
    const { session : {  cookiesAccepted, userId}, body } = req

    if (!userId) return res.redirect('/login')  
        
    try {
        addStickie(userId, body, (error, stickieId) => {

            if (error) return res.render('AddStickie',{ cookiesAccepted, feedback: true, message:error.message })
    
            res.render('AddStickie',{ cookiesAccepted, feedback: true, message:'Stickie Saved!' })
        })
    } catch ({message}) {
        res.render('AddStickie',{ cookiesAccepted, feedback: true, message:message })
        return
    }
       
})
// **********LIST-stickie***********************************************
app.get('/stickies',  cookieSession, (req,res)=>{
    const { session : {  cookiesAccepted, userId} } = req

    if (!userId) return res.redirect('/login')

    try {
        listStickies(userId,(error,stickies)=>{
            if(error) return res.render('Home',{ cookiesAccepted, feedback: true, message:error.message})

            return res.render('Home',{ cookiesAccepted, stickies})
        })
        
    } catch ({message}) {
        res.render('Home',{ cookiesAccepted, feedback: true, message })
        return
    }
    
})
// **********LIST-stickie-POST***********************************************
app.post('/stickies', parseBody, cookieSession, (req,res)=>{
    const { session : {  cookiesAccepted, userId}, body } = req

    if (!userId) return res.redirect('/login')

    try {
        removeStickies(userId, body.stickieId,(error, stickies)=>{
            if(error) return res.render('Home',{ cookiesAccepted, feedback: true, message:error.message})

            res.redirect('/stickies')
        })
        
    } catch ({message}) {
        res.render('Home',{ cookiesAccepted, feedback: true, message})
        return
    }
})
// **********Search-stickie-GET***********************************************
app.get('/search-stickies', cookieSession,(req,res)=>{
    const { session : {  cookiesAccepted, userId }, url } = req

    if (!userId) return res.redirect('/login')
debugger
    if (url.includes('?')) {
        const [, queryString] = url.split('?')
        const [, query] = queryString.split('=')   

        try {
            searchStickies(userId, query,(error,stickies)=>{
                
                if (error) return res.render('SearchStickies',{ cookiesAccepted, feedback: true, message:error.message})

                return res.render('SearchStickies',{ cookiesAccepted, stickies})
            })
            
        } catch ({message}) {
            res.render('SearchStickies',{ cookiesAccepted, feedback: true, message })
            return
        }
    } else {
        res.render('SearchStickies',{ cookiesAccepted })
    }
})

app.listen(8080, () => console.log('server running'))



