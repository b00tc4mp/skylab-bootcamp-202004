const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const App = require('./components/App')
const Register = require('./components/Register')
const Login = require('./components/Login')
const Landing = require('./components/Landing')
const register = require('./logic/register')
const authenticate = require('./logic/authenticate')
const listContacts = require('./logic/list-contacts')
const ListContacts = require('./components/ListContacts')
const addContact = require('./logic/add-contact')
const Home = require('./components/Home')
const retrieveUser = require('./logic/retrieve-user')
const Feedback = require('./components/Feedback')
const AddContact = require('./components/AddContact')
const searchContacts = require('./logic/search-contacts')
const SearchContacts = require('./components/SearchContacts')
const AddSticky = require('./components/AddSticky')
const addSticky = require('./logic/add-sticky')
const listStickies = require('./logic/list-stickies')
const ListStickies = require('./components/ListStickies')
const SearchStickies = require('./components/SearchStickies')
const searchStickies = require('./logic/search-stickies')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))



app.get('/add-sticky', (req, res) => {

    res.send(App(AddSticky()))
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

    const cookie = req.header('cookie')
    const [, userId] = cookie.split('=')
    if (!cookie) return res.redirect('/login')

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

app.get('/', (req, res) => res.send(App(Landing())))
app.get('/register', (req, res) => res.send(App(Register())))

app.post('/register', (req, res) => {
    const { body } = req

    register(body, (error, id) => {
        if (error) throw error
        res.redirect('/login')
    })
})

app.get('/login', (req, res) => {
    const cookie = req.header('cookie')
    if (cookie) {
        const [, userId] = cookie.split('=')
        if (userId) return res.redirect('/home')
    }
    res.send(App(Login()))
})

app.post('/login', (req, res) => {
    const { body: { email, password } } = req

    authenticate(email, password, (error, userId) => {
        debugger
        if (error) return res.send(App(Login() + Feedback(error.message)))

        res.cookie('userId', userId)

        res.redirect('/home')
    })
})

app.get('/home', (req, res) => {
    const cookie = req.header('cookie')

    if (!cookie) return res.redirect('/login')

    const [, userId] = cookie.split('=')

    if (!userId) res.redirect('/login')

    retrieveUser(userId, (error, { name }) => {

        if (error) {
            res.send(App(Home() + Feedback(error.message)))
            res.clearCookie('userId')
            res.redirect('/login')
        }

        res.send(App(Home(name)))

    })
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


app.get('/add-contacts', (req, res) => {

    res.send(App(`${Home()} ${AddContact()}`))
})

app.post('/add-contacts', (req, res) => {

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

app.post('/logout', (req, res) => {

    res.clearCookie('userId')

    res.redirect('/')
})

app.listen(8080)

