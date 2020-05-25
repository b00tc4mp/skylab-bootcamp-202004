const express = require('express')
//COMPONENTS
const App = require('./components/App')
const Landing = require('./components/Landing')
const Register = require('./components/Register')
const Login = require('./components/Login')
const Home = require('./components/Home')
const Feedback = require('./components/Feedback')
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
const {parseBody, parseBodyAndCookies, parseCookies} = require('./utils/middlewares')
const app = express()

app.use(express.static('public'))

app.get('/landing', (req, res) => res.send(App(Landing())))

//////////
//REGISTER
//////////
app.get('/register', parseCookies, (req, res) => {
    const { cookies: { userId } } = req

    if (userId) return res.redirect('/home')
    
    res.send(App(Register()))
})

app.post('/register', (req, res) => {
    let data ={};

    req.on('data', chunk => {data = chunk.toString().convertChunk()})

    req.on('end',()=>{
        try {
            register(data, error => {
                if (error) return res.send(App(Register(Feedback(error.message,'warning'))))
                
                res.redirect('/login')
            })
        } catch ({message}) {
            res.send(App(Register(Feedback(message,'error'))))
            return
        }
    })    
})

//////////
//LOGIN
//////////
app.get('/login', (req, res) => {
    const cookie = req.header('cookie')

    if (cookie) {
        const [, userId] = cookie.split('=')

        if (userId) return res.redirect('/home')
    }
    
    res.send(App(Login()))
})

app.post('/login', (req, res) => {
    let data ={};
    
    req.on('data', chunk => {data = chunk.toString().convertChunk()})
    
    req.on('end', () =>{
       
       try{
            authenticated(data,(error,userId)=>{    
                if (error) return res.send(App(Login(Feedback(error.message,'warning'))))
                res.cookie('userId', userId)
                
                res.redirect('/home')
            }) 
       }catch({message}){
            res.send(App(Login(Feedback(message,'error'))))
            return 
       }
       
    })
})

//////////
//HOME
//////////
app.get('/home',(req,res) => {
    const cookie = req.header('cookie')

    if (!cookie) return res.redirect('/login')

    const [, userId] = cookie.split('=')

    if (!userId) return res.redirect('/login')

    try {
        retrieveUser(userId, (error, { name }) => {
            if (error) return res.send(App(Home(name,Feedback(error.message,'error'))))
    
            res.send(App(Home(name,undefined)))
        })
    } catch ({message}) {
        res.send(App(Home(name,Feedback(message,'error'))))
        return
    }
})


app.post('/logout', (req, res) => {
    res.clearCookie('userId')
debugger
    res.redirect('/login')
})

//////////
//CONTACT
/////////
// **********Add-contact***********************************************
app.get('/add-contact', (req, res) => {
    const cookie = req.header('cookie')
    if (cookie) {
        const [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

        res.send(App(Home(undefined,AddContact())))
    } else return res.redirect('/login')  
})


// **********Add-contact-POST***********************************************
app.post('/add-contact', (req, res) => {
    let data ={};
    let userId
    const cookie = req.header('cookie')
    if (cookie) {
        [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

    } else return res.redirect('/login')  
    
    req.on('data', chunk => {data = chunk.toString().convertChunk()})
    
    data.birthdate = decodeURIComponent(data.birthdate)
    req.on('end', () =>{
        try {
            addContact(userId, data, (error, contactId) => {
                debugger

                if (error) return res.send(App(Home(undefined, AddContact(Feedback(error.message, 'error')))))
        
                res.send(App(Home(undefined,AddContact(Feedback('Contact Saved!')))))
            })
        } catch ({message}) {
            res.send(App(Home(undefined,AddContact(Feedback(message, 'error')))))
            return
        }
    
    })
       
})
// **********LIST-contact***********************************************
app.get('/contacts',(req,res)=>{
debugger
    const cookie = req.header('cookie')

    if (cookie) {
        const [, userId] = cookie.split('=')

        if (!userId) return res.redirect('/login')

        try {
            listContact(userId,(error,contacts)=>{
                if(error) return res.send((App(Home(undefined, ListContacts(undefined, Feedback(error.message,'error'))))))

                res.send((App(Home(undefined,ListContacts(contacts)))))
            })
            
        } catch ({message}) {
            res.send((App(Home(undefined,ListContacts(undefined,Feedback(message,'error'))))))
            return
        }
    } else return res.redirect('/login')
    
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



