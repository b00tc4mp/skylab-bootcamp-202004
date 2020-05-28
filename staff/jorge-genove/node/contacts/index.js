const fs = require("fs");
const path = require("path");
const http = require("http");
const App = require("./components/App");
const listContacts = require("./logic/contact-list");
const ListContacts = require("./components/ListContacts");
const SearchContacts = require("./components/SearchContacts");
const searchContacts = require("./logic/search-contacts");
const addContact = require("./logic/add-contact");
const AddContacts = require("./components/AddContact");
const Landing = require("./components/Landing");
const AddStickies = require("./components/AddStickies");
const addStickies = require("./logic/add-stickies");
const addStickiesList = require("./logic/list-stickies");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader("content-type", "text-html");

  if (url === "/landing") {
    res.end(App(Landing()));
  } else if (url === "/contacts") {
    listContacts((error, contacts) => {
      res.end(App(ListContacts(contacts)));
    });
  } else if (url.startsWith("/search")) {
    if (!url.includes("?")) {
      res.end(App(SearchContacts()));
    } else {
      const [, queryString] = url.split("?");
      const [, query] = queryString.split("=");

      searchContacts(query, (error, contacts) => {
        if (error) throw error;

        res.end(App(`${SearchContacts(query)}${ListContacts(contacts)}`));
      });
    }
  } else if (url === "/add-contact") {
    if (method === "GET") {
      res.end(App(AddContacts()));
    } else if (method === "POST") {
      req.on("data", (chunck) => {
        let contact = {};
        const arrList = chunck.toString().split("&");
        arrList.forEach((element) => {
          const split = element.split("=");
          contact[split[0]] = split[1];
        });

        contact.email = decodeURIComponent(contact.email);

        addContact(contact, (error, contact) => {
          if (error) throw error;
          res.end(App(AddContacts()));
        });
      });
    }
  } else if (url === "/add-stickie") {
    if (method === "GET") {
      res.end(App(AddStickies()));
    } else if (method === "POST") {
      req.on("data", (chunk) => {
        const stickie = {};
        const keyValues = chunk.toString().split("&");
        keyValues.forEach((element) => {
          const splitStickie = element.split("=");
          stickie[splitStickie[0]] = splitStickie[1];
        });
        stickie.comment = decodeURIComponent(stickie.comment);
        addStickies(stickie, (error, stickieResult) => {
          if (error) throw error;

          res.end(App(addStickiesList(stickieResult)));
        });
      });
    }
  } else if (url === '/style.css') {
    fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
        if (error) throw error

        res.setHeader('Content-Type', 'text/css')

        res.end(content)
    })
  }
});
  

server.listen(8080);
