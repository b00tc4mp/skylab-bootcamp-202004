const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const {register,authenticated,retrieveUser,addContact ,listContact, removeContacts,searchContacts,addStickie,listStickies,removeStickies,searchStickies  } = require('./logic')

const app = express()

app.set('view engine','pug');
app.set('views','./components')

app.use(express.static('public'))

const parseBody = bodyParser.urlencoded({extended: false})

const cookieSession = session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{},
    store: new FileStore({
        path: path.join(__dirname,'data','sessions')
    })
})

app.get('/landing', cookieSession, (req, res) => {
const {session:{cookiesAccepted,userId}} = req

    if(userId) return res.redirect('/home')

    res.render('Landing',{cookiesAccepted})
})

//////////
//REGISTER
//////////
app.get('/register',  cookieSession,(req, res) => {
    const {session:{cookiesAccepted,userId}} = req

    if(userId) return res.redirect('/home')

    res.render('Register',{cookiesAccepted})
})

app.post('/register', parseBody, cookieSession, (req, res) => {
    
    const { session:{cookiesAccepted},body: { name, surname, email, password } } = req
    const data ={ name, surname, email, password }

    try {
        register(data, error => {
            if (error) {
                let feedback = error.message
                return res.render('Register',{cookiesAccepted,feedback})
            }
            
            res.redirect('/login')
        })
    } catch (error) {
        feedback = error.message

        res.render('Register',{cookiesAccepted,feedback})
        return
    }
       
})

//////////
//LOGIN
//////////
app.get('/login', cookieSession, (req, res) => {
    const {session:{cookiesAccepted,userId}} = req

    if(userId) return res.redirect('/home')

    res.render('Login',{cookiesAccepted})
})

app.post('/login', parseBody, cookieSession, (req, res) => {
    const { session:{cookiesAccepted}, body: {email, password } } = req
    const data ={email, password}
    try {
        authenticated(data, (error,userId) => {
            if (error) {
                let feedback = error.message
                return res.render('Login',{cookiesAccepted,feedback})
            }
            const {session} = req
            session.userId = userId

            session.save(error => {
            if (error) throw error
            
            res.redirect('/home')
            })
        })
    } catch (error) {
        feedback = error.message
        
        res.render('Login',{cookiesAccepted,feedback})
        return
    }
})


//////////
//HOME
//////////
app.get('/home',cookieSession,(req,res) => {
    const {session:{cookiesAccepted,userId}} = req
debugger
    if (!userId) return res.redirect('/login')

    try {
        retrieveUser(userId, (error, { name }) => {
            if (error) {
                const feedback = error.message

                return res.render('Home', {cookiesAccepted,name,feedback})
            }
    
            res.render('Home', {cookiesAccepted,name,feedback})
        })
    } catch (error) {
        const feedback = error.message
        res.render('Home', {cookiesAccepted,name,feedback})
        return
    }
})


app.post('/logout', cookieSession, (req, res) => {
    const { session } = req

    session.destroy(error => {
        if (error) throw error

        res.redirect('/login')
    })
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



