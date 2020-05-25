const express = require("express");
const App = require("./components/App");
const Register = require("./components/Register");
const Login = require("./components/Login");
const Feedback = require("./components/Feedback");
const Landing = require("./components/Landing");
const AddContacts = require("./components/AddContact");
const AddStickies = require("./components/AddStickie");
const SearchContacts = require("./components/SearchContacts");
const ListContacts = require("./components/ListContacts");
const register = require("./logic/register-user");
const authenticate = require("./logic/authenticate-user");
const listContacts = require("./logic/list-contacts");
const searchContacts = require("./logic/search-contacts");
const addStickies = require("./logic/add-sticky")
const addContact = require("./logic/add-contact");
const { find } = require("./data/users");
const bodyParser = require("body-parser");
const Home = require("./components/Home");
const retrieveUser = require("./logic/retrieve-user");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/", (req, res) => res.send(App(Landing())));
app.get("/register", (req, res) => res.send(App(Register())));

app.post("/register", (req, res) => {
  const { body } = req;

  register(body, (error, id) => {
    if (error) throw error;
    res.redirect("/login");
  });
});

app.get("/login", (req, res) => {
  const cookie = req.header("cookie");
  if (cookie) {
    const [, id] = cookie.split("=");
    if (id) return res.redirect("/home");
  }
  res.send(App(Login()));
});
app.post("/login", (req, res) => {
  const {
    body: { email, password },
  } = req;

  authenticate(email, password, (error, id) => {
    if (error) res.send(App(Login() + Feedback(error.message)));
    res.cookie("id", id);
    res.redirect("/home");
  });
});

app.get("/home", (req, res) => {
  const cookie = req.header("cookie");

  if (!cookie) return res.redirect("/login");

  const [, id] = cookie.split("=");

  if (!id) return res.redirect("/login");

  retrieveUser(id, (error, { name }) => {
    if (error) return res.send(App(Home() + Feedback(error.message)));
    res.send(App(Home(name)));
  });
});

app.get("/landing", (req, res) => {
  const cookie = req.header("cookie");

  if (cookie) {
    const [, id] = cookie.split("=");
    if (id) return res.redirect("/home");
  }
  res.send(App(Landing()));
});

app.post("/logout", (req, res) => {
  res.clearCookie("id");
  res.redirect("/landing");
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
    const cookie = req.header("cookie");
    if (!cookie) return res.redirect("/login");
    const [, id] = cookie.split("=");
    if (!id) return res.redirect("/login");

    searchContacts(id, query, (error, contactResults) => {
      if (error) throw error;

      res.send(App(`${SearchContacts(query)}${ListContacts(contactResults)}`));
    });
  }
});

app.get("/add-contact", (req, res) => {
    res.send(App(AddContacts()));
  });
  
  app.post("/add-contact", (req, res) => {
    const { body } = req;
    const cookie = req.header("cookie");
    if (cookie) {
      const [, id] = cookie.split("=");
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
        const { body } = req;
        const cookie = req.header("cookie");
        if (cookie) {
          const [, id] = cookie.split("=");
          if (!id) return res.redirect("/login");
          addStickies(id, body, (error, stickieResult) => {
            if (error) throw error;
            res.redirect('/add-stickies')
          });
        }
        });
      

app.listen(8080);
