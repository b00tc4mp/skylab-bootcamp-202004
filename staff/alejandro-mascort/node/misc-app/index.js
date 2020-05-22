const express = require("express");
const app = express();
const Register = require("./components/Register")
const register = require('./logic/register-user')
const Login = require('./components/Login')
const login = require('./logic/authenticate-user')
const Home = require('./components/Home')
// app.use(express.static('public'))
const App = require("./components/App");
const listContacts = require("./logic/list-contacts");
const ListContacts = require("./components/ListContacts");
const SearchContacts = require("./components/SearchContacts");
const searchContacts = require("./logic/search-contacts");
const addContact = require("./logic/add-contact");
const AddContacts = require("./components/AddContact");
const Landing = require("./components/Landing");
const AddStickies = require("./components/AddStickie");
const addStickies = require("./logic/add-stickie");
const addStickiesList = require("./logic/list-stickies");
const AddStickiesList = require('./components/ListStickies')
// const retrieveUser = require('/logic/retrieve-user')

let _userId

app.get("/landing", (req, res) => {
  res.send(App(Landing()));
});

app.get("/register", (req, res) => {
  res.send(App(Register()))
})

app.post("/register", (req, res) => {
  req.on('data', chunk => {
    const data = {}

    const userName = chunk.toString().split('&')

    userName.forEach( userName => {
      data[userName.split('=')[0]]  = userName.split('=')[1]
    })

    data.email = decodeURIComponent(data.email)

    const {name, surname, email, password} = data

    register(name, surname, email, password,(error, id) => {
      if (error) throw error
      console.log(id)
      res.redirect('/login')
    })
  })
})

app.get("/login", (req, res) => {
  const cookie = req.header('cookie')

  if (cookie) {
    const [, userId] = cookie.split('=')

    if (userId) res.redirect('/home')
  }

  res.send(App(Login()))
})

app.post('/login', (req, res) => {
  req.on('data', chunk => {
    const data = {}

    const userName = chunk.toString().split('&')

    userName.forEach( userName => {
      data[userName.split('=')[0]] = userName.split('=')[1]
    })

    data.email = decodeURIComponent(data.email)

    const {email, password} = data

    login({email, password}, (error, userId) => {
      if (error) throw error //TODO error handling

      res.setHeader('set-cookie', `userId=${userId}`)

      res.redirect(`/home`)
    })
  })
})

app.get('/home', (req, res) => {
  const cookie = req.header('cookie')

  if (!cookie) return res.redirect('/landing')

  retrieveUser(_userId, (error, user) => {
    if (error) throw error //TODO error handling

    const { name } = user
    
    res.send(App(Home(name)))
  })
})

app.post('/logout', (req, res) => {
  const cookie = req.header('cookie')


})

app.get("/contacts", (req, res) => {
  listContacts((error, contacts) => {
    if (error) throw error //TODO error handling
    res.send(App(ListContacts(contacts)));
  });
});

app.get("/search", (req, res) => {
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
});

app.get("/add-contact", (req, res) => {
  res.send(App(AddContacts()));
});

app.post("/add-contact", (req, res) => {
  req.on("data", (chunck) => {
    let contact = {};
    const arrList = chunck.toString().split("&");
    arrList.forEach((element) => {
      const split = element.split("=");
      contact[split[0]] = split[1];
    });
    contact.email = decodeURIComponent(contact.email);
    addContact(contact, (error) => {
      if (error) throw error;

      res.send(App(AddContacts()));
    });
  });
});

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
    stickie.comment = stickie.comment.split('+').join(' ');
    addStickies(stickie, (error, stickieResult) => {
      if (error) throw error;
      

      res.end(App(AddStickies()));
    });
  });



});

app.get('/stickies', (req, res) => {
  addStickiesList((error, stickies) => {
    console.log(stickies)  
    if (error) throw error;
      
      res.send(App(AddStickiesList(stickies)));
    });
  });



app.listen(8080);