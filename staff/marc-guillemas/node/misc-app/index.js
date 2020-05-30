// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const App = require('./components/App')
// const Register = require('./components/Register')
// const Login = require('./components/Login')
// const Landing = require('./components/Landing')
// const register = require('./logic/register')
// const authenticate = require('./logic/authenticate')
// const listContacts = require('./logic/list-contacts')
// const ListContacts = require('./components/ListContacts')
// const addContact = require('./logic/add-contact')
// const Home = require('./components/Home')
// const retrieveUser = require('./logic/retrieve-user')
// const Feedback = require('./components/Feedback')
// const AddContact = require('./components/AddContact')
// const searchContacts = require('./logic/search-contacts')
// const SearchContacts = require('./components/SearchContacts')
// const AddSticky = require('./components/AddSticky')
// const addSticky = require('./logic/add-sticky')
// const listStickies = require('./logic/list-stickies')
// const ListStickies = require('./components/ListStickies')
// const SearchStickies = require('./components/SearchStickies')
// const searchStickies = require('./logic/search-stickies')
const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact} = require('./logic')
// , addSticky, searchContacts, searchStickies, listContacts, listStickies 
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const app = express()
const parseBody = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views','./components')

const cookieSession = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new FileStore({
        path: path.join(__dirname,'data','sessions')
    })
})

app.get('/', cookieSession, (req, res) => {
    debugger
    const {session: { cookiesAccepted, userId }} = req

    if (userId) return res.redirect('/home')
    
    res.render('Landing',{cookiesAccepted})
})

app.get('/login',cookieSession, (req, res) => {
    debugger
    const {session: { cookiesAccepted, userId }} =req

    if (userId) return res.redirect('/home')

    res.render('Login',{cookiesAccepted})
})

app.post('/login', parseBody, cookieSession, (req, res) => {
    const { body: { email, password } } = req
    
    authenticateUser(email, password, (error, userId) => {
        debugger
        if (error) return res.send(App(Login() + Feedback(error.message)))

        const { session } = req

        session.userId = userId

        session.save(error => {
            if (error) throw error

            res.redirect('/home')
        })
    })
})

app.post('/accept-cookies', cookieSession, (req, res) => {
    const { session } = req

    session.cookiesAccepted = true

    session.save(error => {
        if (error) throw error // TODO error handling

        res.redirect(req.header('referer'))
    })

})

app.get('/register',cookieSession ,(req, res) => { debugger
    const {session: { cookiesAccepted, userId }} =req
    
    if (userId) return res.redirect('/home')
    
    res.render('Register',{cookiesAccepted})
})



app.post('/register',parseBody, (req, res) => {
    const { body } = req

    registerUser(body, (error, id) => {
        if (error) throw error
        res.redirect('/login')
    })
})

app.get('/home', cookieSession, (req, res) => {
    const {session: { cookiesAccepted, userId }} =req

    if (!userId) return res.redirect('/login')


    if (!userId) res.redirect('/login')

    retrieveUser(userId, (error, { name }) => {

        if (error) {
            res.render('Home', 'Feedback(error.message)')
            res.clearCookie('userId')
            res.redirect('/login')
        }

        res.render('Home', {name, cookiesAccepted})

    })
})

app.get('/add-sticky', (req, res) => {

    res.render('AddSticky')
})

app.post('/add-sticky', (req, res) => {

    const cookie = req.header('cookie')
    const [, userId] = cookie.split('=')
    const { body } = req
    debugger
    addSticky(userId, body, (error, idSticky) => {
        if (error) throw error
        res.send(App(AddSticky() + Feedback('Sticky added correctly')))
    })
})

app.get('/search-stickies', (req, res) => {

    const {session: {cookiesAccepted, userId}} = req
    if (!userId) return res.redirect('/login')

    const { query: { q } } = req
    if (q) {
        searchStickies(userId, q, (error, stickies) => {
            if (error) return res.send(App(SearchStickies() + Feedback(error.message)))
            res.send(App(SearchStickies(q) + ListStickies(stickies)))
        })
    }
    else {
        res.send(App(SearchStickies()))
    }
})


app.get('/search-contacts', (req, res) => {
    const cookie = req.header('cookie')
    const [, userId] = cookie.split('=')
    if (!cookie) return res.redirect('/login')

    const { query: { q } } = req
    if (q) {
        searchContacts(userId, q, (error, contacts) => {
            if (error) return res.send(App(SearchContacts() + Feedback(error.message)))
            res.send(App(SearchContacts(q) + ListContacts(contacts)))
        })
    } else {
        res.send(App(SearchContacts()))
    }
})

app.get('/add-contacts', cookieSession,  (req, res) => {
    const {session: { cookiesAccepted}} = req
    

    res.render('AddContact', {cookiesAccepted})
})

app.post('/add-contacts', parseBody, (req, res) => {
    debugger
    const { body } = req
    const cookie = req.header('cookie')
    const [, userId] = cookie.split('=')

    addContact(userId, body, error => {
        if (error) return Feedback(error.message)

    })
})

app.get('/list-contacts', (req, res) => {

    const cookie = req.header('cookie')
    const [, userId] = cookie.split('=')

    listContacts(userId, (error, contacts) => {
        if (error) return Feedback(error.message)
        res.send(App(Home() + ListContacts(contacts)))
    })
})

app.get('/list-stickies', (req, res) => {
    const cookie = req.header('cookie')
    const [, userId] = cookie.split('=')

    listStickies(userId, (error, stickies) => {
        if (error) return Feedback(error.message)
        res.send(App(Home() + ListStickies(stickies)))
    })
})

app.post('/logout', cookieSession, (req, res) => {
    const { session } = req

    session.destroy(error => {
        if(error) throw error

        res.redirect('/login')
    })

})

app.listen(8080)

