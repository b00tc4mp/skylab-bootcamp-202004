const express = require('express')
const app = express()
const path = require('path')
const { register, authenticate, retrieveUser, listContacts, addContact,
        searchContacts, addSticky, listStickies, searchStickies} = require('./logic')
const bodyParser = require('body-parser')
const parseBody = bodyParser.urlencoded({ extended: false })
const session = require('express-session')
const FileStore = require('session-file-store')(session)

app.set('view engine', 'pug')
app.set('views', './components')

app.use(express.static('public'))

const cookieSession = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new FileStore({
        path: path.join(__dirname, 'data', 'sessions')
    })
})

app.get('/', cookieSession, (req, res) => {

    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Landing', { cookiesAccepted })
})


app.get('/login', cookieSession, (req, res) => {

    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Login', { cookiesAccepted })
})

app.post('/login', parseBody, cookieSession, (req, res) => {
    const { body: { email, password } } = req

    authenticate(email, password, (error, userId) => {
        debugger
        if (error) throw error //TODO

        const { session } = req

        session.userId = userId

        session.save(error => {
            if (error) throw error

            res.redirect('/home')
        })
    })
})


app.get('/register', cookieSession, (req, res) => {

    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('Register', { cookiesAccepted })

})

app.post('/register', parseBody, (req, res) => {

    const { body } = req

    register(body, (error, id) => {
        if (error) throw error  //TODO

        res.redirect('/login')
    })
})

app.get('/home', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, { name }) => {
        let errorMessage
        if (error) {
            errorMessage = error.message
            res.render('Home', { cookiesAccepted, name, errorMessage })
        }

        res.render('Home', { cookiesAccepted, name, errorMessage })
    })
})


app.get('/add-contacts', cookieSession, (req, res) => {

    const { session: { cookiesAccepted, userId } } = req
    debugger
    if (!userId) return res.redirect('/login')

    res.render('AddContact', { cookiesAccepted })
})


app.post('/add-contacts', parseBody, cookieSession, (req, res) => {

    const { session: { userId } } = req

    const { body } = req


    addContact(userId, body, error => {
        if (error) throw error //TODO

    })
    res.redirect('/home')
})


app.get('/add-sticky', cookieSession, (req, res) => {
    debugger
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    res.render('AddSticky', { cookiesAccepted })
})

app.post('/add-sticky', parseBody, cookieSession, (req, res) => {

    const { body } = req

    const { session: { userId } } = req

    addSticky(userId, body, (error, idSticky) => {
        if (error) throw error
        const message = 'stiky added correctly'
        res.render('AddSticky', { message })
    })
})



app.get('/search-stickies', parseBody, cookieSession, (req, res) => {

    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    const { query: { q } } = req
    if (q) {
        searchStickies(userId, q, (error, stickies) => {
            if (error) throw error //TODO

            res.render('SearchStickies', { cookiesAccepted, stickies })
        })
    }
    else {
        res.render('SearchStickies', { cookiesAccepted })
    }
})



app.get('/search-contacts', parseBody, cookieSession, (req, res) => {
    debugger
    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    const { query: { q } } = req
    if (q) {
        searchContacts(userId, q, (error, contacts) => {
            if (error) throw error
            res.render('SearchContacts', { cookiesAccepted, contacts })
        })
    } else {
        res.render('SearchContacts', { cookiesAccepted })
    }
})




app.get('/list-contacts', cookieSession, (req, res) => {

    const { session: { cookiesAccepted, userId } } = req

    listContacts(userId, (error, contacts) => {
        if (error) throw error

        res.render('ListContacts', { cookiesAccepted, contacts })
    })
})

app.get('/list-stickies', cookieSession, (req, res) => {

    const { session: { cookiesAccepted, userId } } = req

    listStickies(userId, (error, stickies) => {
        if (error) return Feedback(error.message)
        res.render('ListStickies', { stickies })
    })
})

app.post('/logout', cookieSession, (req, res) => {

    const { session } = req

    session.destroy(error => {

        if (error) throw error

        res.redirect('/login')
    })
})


app.post('/accept-cookies', cookieSession, (req, res) => {
debugger
    const { session } = req

    session.cookiesAccepted = true

    session.save(error => {
        if (error) throw error

        res.redirect(req.header('referer'))
    })
})

app.listen(8081)

