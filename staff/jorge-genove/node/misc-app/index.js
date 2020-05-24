const express = require("express");
const app = express();
const Register = require("./components/Register");
const register = require("./logic/register");
const Login = require("./components/Login");
const login = require("./logic/login");
const App = require("./components/App");
/* const listContacts = require("./logic/contact-list"); */
const ListContacts = require("./components/ListContacts");
const listContacts = require("./logic/list-contacs")
const SearchContacts = require("./components/SearchContacts");
const searchContacts = require("./logic/search-contacts");
const addContact = require("./logic/add-contact");
const AddContacts = require("./components/AddContact");
const Landing = require("./components/Landing");
const AddStickies = require("./components/AddStickies");
const addStickies = require("./logic/add-stickies");
const addStickiesList = require("./logic/list-stickies");
const AddStickiesList = require("./components/ListStickies");
const Home = require("./components/Home");
const Feedback = require("./components/Feedback");
const retrieveUser = require("./logic/retrieve-user");

app.get("/landing", (req, res) => {
  res.send(App(Landing()));
});

app.get("/register", (req, res) => {
  res.send(App(Register()));
});
app.post("/register", (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    const keyValues = body.split("&");

    const user = keyValues.reduce((user, keyValue) => {
      const [key, value] = keyValue.split("=");

      user[key] = decodeURIComponent(value);

      return user;
    }, {});

    const { name, surname, email, password } = user;

    register(name, surname, email, password, (error, id) => {
      if (error) throw error; // TODO error handling

      res.redirect("/login");
    });
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
  req.on("data", (chunk) => (body += chunk));
  let body = "";

  req.on("end", () => {
    const keyValues = body.split("&");
    const credentials = keyValues.reduce((user, keyValue) => {
      const [key, value] = keyValue.split("=");

      user[key] = decodeURIComponent(value);

      return user;
    }, {});

    const { email, password } = credentials;

    login(email, password, (error, id) => {
      if (error) return res.redirect('/login') 
                           
      res.cookie("userId", id);
      res.redirect("/home");
    });
  });
});

app.get("/home", (req, res) => {
  const cookie = req.header("cookie");
  if (!cookie) return res.redirect("/login");

  const [, id] = cookie.split("=");
  if (!id) return res.redirect("/login");
debugger
  /* retrieveUser(id, (error, { name }) => {
    if (error) console.log(error); */
    res.send(App(Home(/* name */)));
  });
/* }); */

 app.get("/contacts", (req, res) => {

const cookie =req.header('cookie')
if(!cookie) return res.redirect('/login')

const [, userId] = cookie.split("=")
if(!userId) return res.redirect('/login')

  listContacts(userId,(error, results) => {
    if (error) throw error;
    res.send(App(ListContacts(results)));
  });
});

/*  app.get("/search", (req, res) => {
  const { url } = req;
  if (!url.includes("?")) {
    res.send(App(SearchContacts()));
  } else {
    const [, queryString] = url.split("?");
    const [, query] = queryString.split("=");

    searchContacts(query, (error, contactResults) => {
      if (error) throw error;

      res.send(App(`${SearchContacts(query)}${ListContacts(contactResults)}`));
    });
  }
}); */
 
app.post("/logout", (req, res) => {
  res.clearCookie("userId");

  res.redirect("/login");
});
app.get("/add-contact", (req, res) => {
  const cookie = req.header('cookie');
  if (!cookie) return res.redirect("/login");

  const [, id] = cookie.split("=");
  if (!id) return res.redirect("/login");

  res.send(App(AddContacts()));
});

app.post("/add-contact", (req, res) => {
  
  const cookie = req.header('cookie');
  if (!cookie) return res.redirect("/login");

  const [, userId] = cookie.split("=");
  if (!userId) return res.redirect("/login");
  
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const keyValue = body.split("&");
    const contact = keyValue.reduce((contact, keyValue) => {
      const [key, value] = keyValue.split("=");
      contact[key] = decodeURIComponent(value);

      return contact;
    }, {});
    const { name, surname, email, phone, birth, country } = contact;

    addContact(contact, userId, (error, contactId) => {debugger
      if (error) throw error;

      res.redirect("/add-contact");
    });
  });
}); 

/*app.get("/add-stickies", (req, res) => {
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
}); */

app.listen(8080);
