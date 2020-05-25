const express = require("express");
const { App, Register, Login, Home, Landing, Cookies, Feedback, AddContact, AddStickies, ListContacts, SearchContacts } = require('./components')
const { registerUser, authenticateUser, retrieveUser, createSession, updateSession, retrieveSession, removeSession, addContact, listContacts, searchContacts, addStickies } = require('./logic')
const { cookieSession } = require('./utils/middlewares')
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const { find } = require("./data/users");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(express.static("public"));

app.get('/', cookieParser, cookieSession, (req, res) => {
  const { session: { cookiesAccepted, userId } } = req

  if (userId) return res.redirect('/home')

  res.send(App(Landing(), cookiesAccepted))
})

// app.get("/", (req, res) => res.send(App(Landing())));

app.get("/register", cookieSession, (req, res) => {
  const { session: { cookiesAccepted, userId } } = req
  if (userId) return res.redirect('/home')
  res.send(App(Register(), cookiesAccepted))
});

app.post("/register", (req, res) => {
  const { body } = req;

  registerUser(body, (error, id) => {
    if (error) throw error;
    res.redirect("/login");
  });
});

app.get("/login", cookieSession, (req, res) => {
  const { cookies, session: { cookiesAccepted } } = req;
  if (cookies) {
    const {id} = cookies;
    if (id) return res.redirect("/home");
  }
  res.send(App(Login(), cookiesAccepted));
});
app.post("/login", cookieSession, (req, res) => {
  const {
    body: { email, password },
  } = req;

  authenticateUser(email, password, (error, id) => {
    if (error) res.send(App(Login() + Feedback(error.message)));
    const { session } = req;
    session.userId = id
    session.save(error => {
      if (error) throw error      
      res.cookie("id", id);
      res.redirect("/home");
  })
  });
});

app.get("/home", cookieSession, (req, res) => {
  const { cookies, session: { cookiesAccepted } } = req;

  if (!cookies) return res.redirect("/login");
  const {id} = cookies;
  if (!id) return res.redirect("/login");

  retrieveUser(id, (error, { name }) => {
    if (error) return res.send(App(Home() + Feedback(error.message)));
    res.send(App(Home(name), cookiesAccepted));
  });
});

app.get("/landing", (req, res) => {
  const { cookies } = req;
  if (cookies) {
    const {id} = cookies;
    if (id) return res.redirect("/home");
  }
  res.send(App(Landing()));
});

app.post("/logout", cookieSession, (req, res) => {
  const { session } = req;
  // res.clearCookie("id");
  session.destroy(error => {
    if (error) throw error
    res.redirect("/landing");
})
});

app.get("/contacts", (req, res) => {
    listContacts((error, contacts) => {
      if (error) throw error //TODO error handling
      res.send(App(ListContacts(contacts)));
    })
  })

app.get("/search", (req, res) => {
  const {
    query: { q: query },
} = req;
  if (!query) {
    res.send(App(SearchContacts()));
  } else {
  const { cookies } = req;
    if (!cookies) return res.redirect("/login");
    const {id} = cookies;
    if (!id) return res.redirect("/login");

    searchContacts(id, query, (error, contactResults) => {
      if (error) throw error;

      res.send(App(`${SearchContacts(query)}${ListContacts(contactResults)}`));
    });
  }
});

app.get("/add-contact", (req, res) => {
    res.send(App(AddContact()));
  });
  
  app.post("/add-contact", (req, res) => {
    const { body, cookies } = req;
    if (cookies) {
    const {id} = cookies;
      if (!id) return res.redirect("/login");
      addContact(id, body, (error) => {
        if (error) throw error;
        res.redirect("/search");
      });
    }
    });

    app.get("/add-stickies", (req, res) => {
        res.send(App(AddStickies()));
      });
      
      app.post("/add-stickie", (req, res) => {
        const { body, cookies } = req;
        if (cookies) {
          const {id} = cookies;
          if (!id) return res.redirect("/login");
          addStickies(id, body, (error, stickieResult) => {
            if (error) throw error;
            res.redirect('/add-stickies')
          });
        }
        });
  app.post('/accept-cookies', cookieSession, (req, res) =>{
    const { session } = req;
    session.cookiesAccepted = true

    session.save(error => {
      if (error) throw error
      res.redirect(req.header('referer'))
    })
  })
  

app.listen(8080);
