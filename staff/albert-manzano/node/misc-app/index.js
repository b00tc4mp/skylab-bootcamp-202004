const express = require('express')
const { retrieveUser, createSession, registerUser, authenticateUser, listContacts, addContact, searchContacts, addSticky, searchStickies, listStickies, removeContact, removeSticky } = require('./logic')
const { App, Landing, Home, Register, Login, ListContacts, ListStickies, AddContact, AddSticky, SearchContacts, SearchStickies } = require('./components')
const { parseBody, parseCookies, cookieSession } = require('./utils/middlewares')

const app = express()

app.use(express.static('public'))

app.get('/', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (userId) return res.redirect('/home');

    res.send(App(Landing(), cookiesAccepted));
})

//========== REGISTER

app.get('/register', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (userId) res.redirect('./home');

    res.send(App(Register(), cookiesAccepted));
})

app.post('/register', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password, (error, id) => {
            if (error) return res.send(App(Register(error.message)));

            res.redirect('/login');
        })
    } catch ({ message }) {
        res.send(App(Register(message)));

        return
    }
});

//========== LOGIN

app.post('/login', parseBody, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (userId) return res.redirect('./home');

    res.send(App(Login(), cookiesAccepted));
});

app.post('/login', parseBody, parseCookies, cookieSession, (req, res) => {
    const { body: { email, password } } = req;

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) throw res.send(App(Login(error.message)));

            const { session } = req;

            session.userId = userId;

            session.save(error => {
                if (error) throw res.send(App(Login(error)));

                res.redirect('./home');
            })
        })
    } catch (message) {
        res.send(App(Login(message)));

    }
});

//=========== HOME

app.get('/home', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    try {
        retrieveUser(userId, (error, user) => {
            if (error) throw res.send(App(Home(error)));

            const { name } = user;

            res.send(App(Home(name), cookiesAccepted));
        })
    } catch (message) {
        res.send(App(Home(message), cookiesAccepted));
    }
});

//================ ADD CONTACT

app.get('/add-contact', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    res.send(App(AddContact(), cookiesAccepted));
});

app.post('/add-contact', parseBody, (req, res) => {
    const { body: { contact } } = req;

    try {
        addContact(userId, contact, (error, id) => {
            if (error) throw res.send(App(AddContact(error.message)));

            res.redirect('/add-contact');
        })

    } catch (message) {
        res.send(App(AddContact(message)));
    }
});

//================= LIST CONTACTS

app.get('/list-contacts', parseCookies, cookieSession, (req, res) => {
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    listContacts(userId, (error, contacts) => {
        if (error) throw res.send(App(ListContacts(error.message)));

        res.send(App(ListContacts(contacts), cookiesAccepted));
    })

})

app.get('/list-contacts/:idContact', parseBody, parseCookies, cookieSession, (req, res) => {
    const { idContact } = req.params;
    const { session: { cookiesAccepted, userId } } = req;

    if (!userId) return res.redirect('/login');

    try {
        removeContact(userId, idContact, (error, feedback) => {
            if (error) throw res.send(App(ListContacts(error)));
            if (feedback) return res.send(App(ListContacts(feedback)));
            else throw res.send(App(ListContacts(error.message)));
        })
    } catch (message) {
        res.send(App(ListContacts(message), cookiesAccepted));
    }
});

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

//======================= LOGOUT

app.post('/logout', parseCookies, cookieSession, (req, res) => {
    const { session } = req;

    session.destroy(error => {
        if (error) throw error

        res.redirect('/login');
    });
});

app.listen(8080, () => console.log('server running'));