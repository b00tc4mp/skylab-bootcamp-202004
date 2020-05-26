const express = require('express')
//COMPONENTS
const AddContact = require('./components/AddContact')
const AddStickie = require('./components/AddStickie')
const ListContacts = require('./components/ListContacts')
const ListStickies = require('./components/ListStickies')
const SearchContacts = require('./components/SearchContacts')
const SearchStickies = require('./components/SearchStickies')
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
require('./utils/string');
//MIDDLEWARES
const {parseBody, parseCookies} = require('./utils/middlewares')
const cookieSession = require('./helpers/middlewares/cookie-session')

// const bodyParser = require('body-parser')
// const session = require('express-session')

// const parseBody = bodyParser.urlencoded({ extended: false })

const app = express()

app.set('view engine', 'pug')
app.set('views', './components')


app.use(express.static('public'))

app.get('/', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.render('Home')

    res.render('Landing', {cookiesAccepted})
})

app.post('/accept-cookies', parseCookies, cookieSession, (req, res) => {
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
app.get('/register', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.render('Home', { cookiesAccepted })
    
    res.render('Register', {cookiesAccepted})
})

app.post('/register', parseBody, (req, res) => {
    const { data } = req 
    
    try {
        register(data, error => {
            if (error) return res.render('Register',{ cookiesAccepted, feedback: `${error.message}` })
            
            res.redirect('/login')
        })
    } catch ({message}) {
        res.render('Register',{ cookiesAccepted, feedback: `${message}` })
        return
    }   
})

//////////
//LOGIN
//////////
app.get('/login', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.render('Home', { cookiesAccepted })
    
    res.render('Login',{ cookiesAccepted })
})

app.post('/login', parseBody, parseCookies, cookieSession, (req, res) => {
    const { data, session } = req

    try{
        authenticated(data,(error,userId)=>{    
            if (error) return  res.render('Login',{ cookiesAccepted: session.cookiesAccepted, feedback: `${error.message}` })

            session.userId = userId

            session.save(error => {
                if (error) throw error //TODO handle error

                res.redirect('/home')
            })
            
        }) 
    }catch({message}){
        res.render('Login',{ cookiesAccepted, feedback: `${message}` })
        return 
    }
       
})

//////////
//HOME
//////////
app.get('/home', parseCookies, cookieSession, (req,res) => {
    const { session: { userId, cookiesAccepted } } = req

    if (!userId) return res.render('Login', { cookiesAccepted })

    try {
        retrieveUser(userId, (error, { name }) => {
            if (error) return res.render('Home', {cookiesAccepted })
    
            res.render('Home', {cookiesAccepted})
        })
    } catch ({message}) {
        res.render(App(Home(name,Feedback(message,'error')), cookiesAccepted))
        return
    }
})


app.post('/logout', parseCookies, cookieSession, (req, res) => {
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
app.get('/add-contact', parseCookies, cookieSession, (req, res) => {
    const { session : {  cookiesAccepted, userId}} = req

    if (!userId) return res.redirect('/login')

    res.send(App(Home(undefined,AddContact()), cookiesAccepted))
})


// **********Add-contact-POST***********************************************
app.post('/add-contact', parseBody, parseCookies, cookieSession, (req, res) => {
    const { session : {  cookiesAccepted, userId}, data } = req

    if (!userId) return res.redirect('/login')  
        
    data.birthdate = decodeURIComponent(data.birthdate)

    try {
        addContact(userId, data, (error, contactId) => {

            if (error) return res.send(App(Home(undefined, AddContact(Feedback(error.message, 'error'))), cookiesAccepted))
    
            res.send(App(Home(undefined,AddContact(Feedback('Contact Saved!'))), cookiesAccepted))
        })
    } catch ({message}) {
        res.send(App(Home(undefined,AddContact(Feedback(message, 'error'))), cookiesAccepted))
        return
    }
    
       
})
// **********LIST-contact***********************************************
app.get('/contacts', parseCookies, cookieSession, (req,res)=>{
    const { session : {  cookiesAccepted, userId} } = req

    if (!userId) return res.redirect('/login')

    try {
        listContact(userId,(error,contacts)=>{
            if(error) return res.send((App(Home(undefined, ListContacts(undefined, Feedback(error.message,'error'))), cookiesAccepted)))

            res.send((App(Home(undefined,ListContacts(contacts)), cookiesAccepted)))
        })
        
    } catch ({message}) {
        res.send((App(Home(undefined,ListContacts(undefined,Feedback(message,'error'))))))
        return
    }
    
})
// **********LIST-contact-POST***********************************************
app.post('/contacts',(req,res)=>{
    const cookie = req.header('cookie')
    let data= {}
    if (cookie) {
        const [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

        req.on('data', chunk => {data = chunk.toString().convertChunk()})
       
        req.on('end',()=>{
            try {
                debugger
                removeContacts(userId, data.contactId,(error,contacts)=>{
                    if(error) return res.send((App(Home(ListContacts(undefined,Feedback(error.message,'error'))))))
    
                    res.redirect('/contacts')
                })
                
            } catch ({message}) {
                res.send((App(Home(undefined,Listcontacts(undefined,Feedback(message,'error'))))))
                return
            }
        
        })
    } else return res.redirect('/login')
})
// **********Search-contact-GET***********************************************
app.get('/search-contacts', (req,res) => {
    const cookie = req.header('cookie')
    const { url } = req

    if (cookie) {
        const [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

        if (url.includes('?')) {
                const [, queryString] = url.split('?')
                const [, query] = queryString.split('=')   

                try {
                    debugger
                    searchContacts(userId, query,(error,contacts)=>{
                        
                        if (error) return res.send((App(Home(undefined,SearchContacts(query, ListContacts(undefined,Feedback(error.message,'error')))))))
        
                        return res.send((App(Home(undefined,SearchContacts(query,ListContacts(contacts))))))
                    })
                    
                } catch ({message}) {
                    res.send((App(Home(undefined,SearchContacts(query,ListContacts(undefined,Feedback(message,'error')))))))
                    return
                }
        } else {
            res.send(App(Home(undefined, SearchContacts())))
        }
    } else return res.redirect('/login')
})


//////////
//STICKIE
/////////

// **********ADD-stickie***********************************************
app.get('/add-stickie', (req, res) => {
    const cookie = req.header('cookie')

    if (!cookie) return res.redirect('/login')

    const [, userId] = cookie.split('=')

    if (!userId) return res.redirect('/login')

    res.send(App(Home(undefined, AddStickie())))
})

// **********ADD-stickie-POST***********************************************
app.post('/add-stickie', (req, res) => {
    let data ={};
    let userId
    const cookie = req.header('cookie')
    if (cookie) {
        [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

    } else return res.redirect('/login')  
    
    req.on('data', chunk => {data = chunk.toString().convertChunk()})
    
    req.on('end', () =>{
        try {
            addStickie(userId, data, (error, stickieId) => {
                debugger
                if (error) return res.send(App(Home(undefined ,AddStickie(Feedback(error.message, 'error')))))
        
                res.send(App(Home(undefined,AddStickie(Feedback('stickie Saved!')))))
            })
        } catch ({message}) {
            res.send(App(Home(undefined,AddStickie(Feedback(message, 'error')))))
            return
        }
    
    })
       
})
// **********LIST-stickie***********************************************
app.get('/stickies',(req,res)=>{
    const cookie = req.header('cookie')

    if (cookie) {
        const [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

        try {
            listStickies(userId,(error,stickies)=>{
                if(error) return res.send((App(Home(ListStickies(undefined,Feedback(error.message,'error'))))))

                res.send((App(Home(undefined,ListStickies(stickies)))))
            })
            
        } catch ({message}) {
            res.send((App(Home(undefined,ListStickies(undefined,Feedback(message,'error'))))))
            return
        }
    } else return res.redirect('/login')
    
})
// **********LIST-stickie-POST***********************************************
app.post('/stickies',(req,res)=>{
    const cookie = req.header('cookie')
    let data= {}
    if (cookie) {
        const [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

        req.on('data', chunk => {data = chunk.toString().convertChunk()})
       
        req.on('end',()=>{
            try {
                debugger
                removeStickies(userId, data.stickieId,(error,stickies)=>{
                    if(error) return res.send((App(Home(ListStickies(undefined,Feedback(error.message,'error'))))))
    
                    res.redirect('/stickies')
                })
                
            } catch ({message}) {
                res.send((App(Home(undefined,ListStickies(undefined,Feedback(message,'error'))))))
                return
            }
        
        })
    } else return res.redirect('/login')
})
// **********Search-stickie-GET***********************************************
app.get('/search-stickies',(req,res)=>{
    const cookie = req.header('cookie')
    const { url } = req

    if (cookie) {
        const [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

        if (url.includes('?')) {
                const [, queryString] = url.split('?')
                const [, query] = queryString.split('=')   

                try {
                    debugger
                    searchStickies(userId, query,(error,contacts)=>{
                        
                        if (error) return res.send((App(Home(undefined,SearchStickies(query, ListStickies(undefined,Feedback(error.message,'error')))))))
        
                        return res.send((App(Home(undefined,SearchStickies(query,ListStickies(contacts))))))
                    })
                    
                } catch ({message}) {
                    res.send((App(Home(undefined,SearchStickies(query,ListStickies(undefined,Feedback(message,'error')))))))
                    return
                }
        } else {
            res.send(App(Home(undefined, SearchStickies())))
        }
    } else return res.redirect('/login')
})




app.listen(8080, () => console.log('server running'))



