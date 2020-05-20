const net = require("net");
const listContacts = require("./logic/list-contacts");
const searchContacts = require("./logic/search-contacts");
const addContacts = require("./logic/add-contact")

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const [line, ...rest] = data.toString().split("\n");

    const [method, path] = line.split(" ").map((item) => item.trim());

    if (path === "/contacts") {
      listContacts((error, contacts) => {
        if (error) throw error;

        socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name }) => `<li>${name}</li>`).join("")}
</ul>
`);
        socket.end();
      });
    } else if (path.startsWith("/contacts") && path.includes("?")) {
      const [, queryString] = path.split("?");

      const [, query] = queryString.split("=");

      searchContacts(query, (error, contacts) => {
        if (error) throw error;

        socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name }) => `<li>${name}</li>`).join("")}
</ul>
`);
        socket.end();
      });
    } else if (path === "/add-contact") {
      if (method === "GET") {
        socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Add contact</h2>
<form action="/add-contact" method="POST">
            <input type="text" name="name">
            <input type="text" name="surname">
            <input type="email" name="email">
            <input type="text" name="phone">
            <button>Add</button>
</form>
`);
        socket.end();
      } else if (method === "POST") {
        let params = rest.pop().replace('%40', '@').split("&")
        let obj = {}
        params.forEach((param) => {
          const key = param.split('=')[0]
          const value = param.split('=')[1]
          obj[key] = value
        });
        console.log(obj);

        addContacts(obj, (error, id)=>{
            if (error) throw error

        })
        socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Add contact</h2>
${obj}
`);
        socket.end();
      }
    } else {
      socket.write(`HTTP/1.1 404
content-type: text/html

<h2>Not Found :(</h2>
`);
      socket.end();
    }
  });

  socket.on("error", console.log);
});

server.listen(8080);
