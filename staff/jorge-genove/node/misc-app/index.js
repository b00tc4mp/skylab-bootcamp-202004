const express = require("express");
const app = express();
const { register, login, retrieveUser, addContact, addStickies, listContacts, listStickies, searchUser, searchContacts } = require('./logic');
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path = require('path')



app.set('view engine', 'pug')
app.set('views', './components')

const parseBody = bodyParser.urlencoded({ extended: false })

const cookieSession = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new FileStore({
    path: path.join(__dirname, 'data', 'sessions')
  })
})

app.use(express.static('public'))

app.get("/landing", cookieSession, (req, res) => {
  
  const { session: { cookiesAccepted, userId } } = req

  if (userId) return res.redirect('/home')

  res.render('Landing', { cookiesAccepted })
});

app.get("/register", cookieSession, (req, res) => {
  
  const { session: { cookiesAccepted, userId } } = req

  if (userId) return res.redirect('/home')

  res.render('Register', { cookiesAccepted })
});

app.post("/register", parseBody, (req, res) => {
  
  const { body: { name, surname, email, password } } = req

  register(name, surname, email, password, (error, id) => {
    if (error) throw error

    res.redirect('/login')
  })
});

app.get("/login", cookieSession, (req, res) => {
  
  const { session: { cookiesAccepted, userId } } = req

  if (userId) return res.redirect('/home')

  res.render('Login', { cookiesAccepted })
});

app.post("/login", parseBody, cookieSession, (req, res) => {
  const { body: { email, password } } = req

  login(email, password, (error, userId) => {
    if (error) throw error

    const { session } = req

    session.userId = userId

    session.save(error => {
      if (error) throw error
      res.redirect('/home')
    })
  })
})

app.get("/home", cookieSession, (req, res) => {
  
  const { session: { cookiesAccepted, userId } } = req

  if (!userId) return res.redirect('/login')

  retrieveUser(userId, (error, user) => {
    if (error) throw error

    const { name } = user

    res.render('Home', { cookiesAccepted, name })
  })
})

app.post('/accept-cookies', cookieSession, (req, res) => {
  const { session } = req

  session.cookiesAccepted = true

  session.save((error) => {
    res.redirect(req.header('referer'))
  })
})

app.get("/contacts", cookieSession, (req, res) => {
  const { session: { cookiesAccepted, userId } } = req

  listContacts(userId, (error, results) => {
    if (error) throw error;
    res.render('ListContacts', { cookiesAccepted, results });
  });
});

app.get("/search-contact", parseCookies, (req, res) => {
  
  const { cookies: { userId } } = req

  if (!userId) return res.redirect('/login')

  res.send(App(SearchContacts()))


});

app.post("/search-contact", parseCookies, parseBody, (req, res) => {
  
  const { cookies: { userId } } = req
  
  if (!userId) return res.redirect('/login')

  const { body: { q } } = req
  
  searchContacts(userId, q, (error, contacts) => {
    if (error) throw error
    
    res.send(App(SearchContacts(q) + ListContacts(contacts)))
  })
})

app.post("/logout", cookieSession, (req, res) => {
  
  const { session } = req

  session.destroy(error => {
    if (error) throw error

    res.redirect("/login");
  });

  app.get("/add-contact", cookieSession, (req, res) => {

    const { session: { cookiesAccepted, userId } } = req

    if (!userId) return res.redirect('/login')

    res.render('AddContact', { cookiesAccepted })

  });

  app.post("/add-contact", parseBody, cookieSession, (req, res) => {
    
    const { body: { name, surname, email, phone, birth, country } } = req
    const contact = { name, surname, email, phone, birth, country }
    const { session: { userId } } = req

    addContact(contact, userId, (error) => {
      if (error) throw error

      res.redirect('/home')
    })
  })

  app.get("/search-users", parseCookies, (req, res) => {
    const { cookies: { userId } } = req
    if (!userId) res.redirect('/login')

    res.send(App(SearchUsers()))
  })

  app.post("/search-users", parseBody, parseCookies, (req, res) => {
    const { cookies: { userId } } = req
    if (!userId) return res.redirect('/login')

    const { body: { q } } = req
    searchUsers(userId, q, (error, users) => {
      if (error) throw error
      res.render('SearchUsers', { users, cookiesAccepted }
      )
    })
  })

  app.get("/add-stickies", (req, res) => {
    res.send(App(AddStickies()));
  });

  app.post("/add-stickies", (req, res) => {
    req.on("data", (chunck) => {
      let stickie = {};
      const keyValues = chunck.toString().split("&");
      keyValues.forEach((element) => {
        const splitStickie = element.split("=");
        stickie[splitStickie[0]] = splitStickie[1];
      });
      console.log(stickie);
      stickie.comment = stickie.comment.split("+").join(" ");
      addStickies(stickie, (error, stickieResult) => {
        if (error) throw error;

        res.end(App(AddStickies()));
      });
    });
  });

  app.get("/stickies", (req, res) => {
    addStickiesList((error, stickies) => {
      console.log(stickies);
      if (error) throw error;

      res.send(App(AddStickiesList(stickies)));
    });
  });
})

app.listen(8080);
