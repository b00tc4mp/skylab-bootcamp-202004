const express = require('express')
const App = require('./components/App')
const {retrieveUser,registerUser,authenticateUser,listContacts,addContact,searchContacts,addSticky,searchStickies,listStickies,removeContact,removeSticky}=require('./logic')
const {Landing,Home,Register,Login,ListContacts,ListStickies,AddContact,AddSticky,SearchContacts,SearchStickies}=require ('./components')

const checkCookie = require('./helper/check-cookie')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (userId) return res.redirect('/home')
        return res.send(App(Landing()))
    })
})

//========== REGISTER

app.get('/register', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (userId) return res.redirect('/home')
        return res.send(App(Register()))
    })
})

app.post('/register', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        const keyValues = body.split('&')

        const user = keyValues.reduce((user, keyValue) => {
            debugger
            const [key, value] = keyValue.split('=')

            user[key] = decodeURIComponent(value)

            return user
        }, {})

        const { name, surname, email, password } = user
        debugger
        try{
            registerUser(name, surname, email, password, (error, id) => {
                if (error) return res.send(App(Register(error.message)))

                res.redirect('/login')
            })
        }catch({message}){
            res.send(App(Register(message)))
            return
        }
    })
})

//========== LOGIN

app.get('/login', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (userId) return res.redirect('/home')

        return res.send(App(Login()))
    })
})

app.post('/login', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {

        const keyValues = body.split('&')

        const credentials = keyValues.reduce((user, keyValue) => {
            const [key, value] = keyValue.split('=')

            user[key] = decodeURIComponent(value)

            return user
        }, {})

        const { email, password } = credentials

        authenticateUser(email, password, (error, userId) => {
            if (error) throw error // TODO error handling

            res.cookie('userId', userId)

            res.redirect('/home')
        })
    })
})

//=========== HOME

app.get('/home', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (error) return res.redirect('/login')
        if (userId) {
            retrieveUser(userId, (error, { name }) => {
                if (error) throw error

                res.send(App(Home(name)))
            })
        }
    })
})

//================ ADD CONTACT

app.get('/add-contact', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (error) return res.redirect('/login')
        if (userId) {
            res.send(App(AddContact()))
        }
    })
})

app.post('/add-contact', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        const keyValues = body.split('&')

        const contact = keyValues.reduce((contact, keyValue) => {
            const [key, value] = keyValue.split('=')

            contact[key] = decodeURIComponent(value)

            return contact
        }, {})

        checkCookie(req, (error, userId) => {
            if (error) return res.redirect('/login')
            if (userId) {
                addContact(userId, contact, (error, id) => {
                    if (error) throw error // TODO error handling

                    res.redirect('/add-contact')
                })
            }
        })
    })
})

//================= LIST CONTACTS

app.get('/list-contacts', (req, res) => {

    checkCookie(req, (error, userId) => {
        if (error) return res.redirect('/login')
        if (userId) {
            listContacts(userId, (error, contacts) => {
                if (error) throw error;

                res.send(App(ListContacts(contacts)))

            })
        }
    })
})

app.get('/list-contacts/:idContact', (req, res) => {
    const {idContact} = req.params

    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        checkCookie(req, (error, userId) => {
            if (error) return res.redirect('/login')
            if (userId) {
                removeContact(userId, idContact, (error, feedback)=> {
                    if (error) throw error
                    if (feedback) return res.redirect('/list-contacts')
                    else throw new Error('something went wrong')
                    
                })
            }
        })
    })
})

//================= Search Contacts

app.get('/search-contacts', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (error) return res.redirect('/login')
        if (userId) {
            if (req.query.q) {
                const query = req.query.q
                searchContacts(query, (error, contacts) => {
                    if (error) throw error
                    return res.send(App(SearchContacts(query, contacts) + ListContacts(contacts)))

                })
            } else return res.send(App(SearchContacts()))
        }
    })
})

// ============= Sticky Notes

app.get('/add-sticky', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (error) return res.redirect('/login')
        if (userId) {
            res.send(App(AddSticky()))
        }
    })
})

app.post('/add-sticky', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        const keyValues = body.split('&')

        const sticky = keyValues.reduce((sticky, keyValue) => {
            const [key, value] = keyValue.split('=')

            sticky[key] = decodeURIComponent(value)

            return sticky
        }, {})

        checkCookie(req, (error, userId) => {
            if (error) return res.redirect('/login')
            if (userId) {
                addSticky(userId, sticky, (error, id) => {
                    if (error) throw error // TODO error handling

                    res.redirect('/add-sticky')
                })
            }
        })
    })
})

//========================LIST STICKIES

app.get('/list-stickies', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (error) return res.redirect('/login')
        if (userId) {
            listStickies(userId, (error, stickies) => {
                if (error) throw error;

                res.send(App(ListStickies(stickies)))

            })
        }
    })
})

app.get('/list-stickies/:idSticky', (req, res) => {
    const {idSticky} = req.params

    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        checkCookie(req, (error, userId) => {
            if (error) return res.redirect('/login')
            if (userId) {
                removeSticky(userId, idSticky, (error, feedback)=> {
                    if (error) throw error
                    if (feedback) return res.redirect('/list-stickies')
                    else throw new Error('something went wrong')
                    
                })
            }
        })
    })
})

//========================SEARCH STICKIES

app.get('/search-stickies', (req, res) => {
    checkCookie(req, (error, userId) => {
        if (error) return res.redirect('/login')
        if (userId) {
            if (req.query.q) {
                const query = req.query.q
                searchStickies(query, (error, stickies) => {
                    if (error) throw error
                    return res.send(App(SearchStickies(query, stickies) + ListStickies(stickies)))

                })
            } else return res.send(App(SearchStickies()))
        }
    })
})

//======================= LOGOUT

app.post('/logout', (req, res) => {
    res.clearCookie('userId')

    res.redirect('/login')
})

app.listen(8007, () => console.log('server running'))