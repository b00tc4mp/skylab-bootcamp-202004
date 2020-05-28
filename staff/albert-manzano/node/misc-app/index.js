const express = require('express')
const { retrieveUser, registerUser, authenticateUser, listContacts, addContact, searchContacts, addSticky, searchStickies, listStickies, removeContact, removeSticky } = require('./logic')
// const { App, Landing, Home, Register, Login, ListContacts, ListStickies, AddContact, AddSticky, SearchContacts, SearchStickies } = require('./components')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const parseBody = bodyParser.urlencoded({ extended: false })

const app = express()

app.use(express.static('public'))

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

app.get('/', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (userId) return res.redirect('/home');

    res.render('Landing', { cookiesAccepted });
})

//========== REGISTER

app.get('/register', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (userId) res.redirect('./home');

    res.render('Register', { cookiesAccepted });
})

app.post('/register', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password, (error, id) => {
            if (error) return res.render('Register', { message });

            res.redirect('/login');
        })
    } catch ({ message }) {
        return res.reder('Register', { message, cookiesAccepted });

    }
});

//========== LOGIN

app.get('/login', parseBody, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (userId) return res.redirect('./home');

    res.render('Login', { cookiesAccepted });
});

app.post('/login', parseBody, cookieSession, (req, res) => {
    const { body: { email, password } } = req;

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) return res.render('Login', { message });

            const { session } = req;

            session.userId = userId;

            session.save(error => {
                if (error) return res.render('Login', { message });

                res.redirect('./home');
            })
        })
    } catch (message) {
        res.render('Login', { message, cookiesAccepted });

    }
});

//=========== HOME

app.get('/home', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    try {
        retrieveUser(userId, (error, user) => {
            if (error) return res.render('Home', { error });

            const { name } = user;

            res.render('Home', { name, cookiesAccepted });
        })
    } catch (message) {
        res.render('Home', { message, cookiesAccepted });
    }
});

//================ ADD CONTACT

app.get('/add-contact', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    res.render('AddContact', { cookiesAccepted });
});

app.post('/add-contact', parseBody, (req, res) => {
    const { body: { contact } } = req;

    try {
        addContact(userId, contact, (error, id) => {
            if (error) return res.render(AddContact, { message });

            res.redirect('/add-contact');
        })

    } catch (message) {
        res.render('AddContact', { message });
    }
});

//================= LIST CONTACTS

app.get('/list-contacts', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    try {
        listContacts(userId, (error, stickies) => {
            if (error) return res.render('ListContacts', { message });

            res.render('ListContacts', { stickies, cookiesAccepted });
        })

    } catch (message) {
        res.render('ListContacts', { message, });
    }

})

app.get('/list-contacts/:idContact', parseBody, cookieSession, (req, res) => {
    const { idContact } = req.params;
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    try {
        removeContact(userId, idContact, (error, feedback) => {
            if (error) return res.render('ListContacts', { error });
            if (feedback) return res.render('ListContacts', { feedback });
            else return res.render('ListContacts', { message });
        })
    } catch (error) {
        const { message } = error
        res.render('ListContacts', { message, cookiesAccepted });
    }
});

//================= Search Contacts

app.get('/search-contacts', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    if (req.query.q) {
        const query = req.query.q

        try {
            searchContacts(query, (error, contacts) => {
                if (error) throw error

                return res.send(App(SearchContacts(query, contacts) + ListContacts(contacts)))
            })
        } catch (error) {

        }

    } else return res.send(App(SearchContacts()))
})



// ============= Sticky Notes


app.get('/list-stickies', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    listStickies(userId, (error, contacts) => {
        if (error) throw res.send(App(ListStickies(error.message)));

        res.send(App(ListStickies(contacts), cookiesAccepted));
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
    const { idSticky } = req.params

    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        checkCookie(req, (error, userId) => {
            if (error) return res.redirect('/login')
            if (userId) {
                removeSticky(userId, idSticky, (error, feedback) => {
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

//======================= ACCEPT COOKIES

app.post('/accept-cookies', cookieSession, (req, res) => {
    const { session } = req;

    session.cookiesAccepted = true;

    session.save(error => {
        if (error) throw res.redirect(req.header('referer'), { message })

        res.redirect(req.header('referer'));
    });
});

//======================= LOGOUT

app.post('/logout', cookieSession, (req, res) => {
    const { session } = req;

    try {
        session.destroy(error => {
            if (error) throw error

            res.redirect('/login');
        });
    } catch (error) {
        const { message } = error
        res.redirect(req.header('referer'), { message })
    }
});

app.listen(8080, () => console.log('server running'));

//**************** undefined */


app.get('*', cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req

    if (userId) return res.redirect('/home')

    res.render('NotFound404', { cookiesAccepted })
})

app.listen(8080, () => console.log('server running'))