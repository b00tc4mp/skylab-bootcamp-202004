const net = require("net");
const path = require("path");
const listContacts = require("./logic/contact-list");
const searchContacts = require("./logic/search-contacts");

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
    listContacts((error, contacts) => {
    if (error) throw error;

    searchContacts("as", (error, results) => {
      if (error) throw error;

      
        socket.write(`HTTP/1.1 200
   content-type: text/html
   
   <h1>Contact List</h1>
   <ul>
   ${contacts.map(({ name }) => `<li>${name}</li>`).join("")}
   </ul>
   <h1>Search Contacts</h1>
   <ul>
   ${results.map(({ name }) => `<li>${name}</li>`).join("")}
   </ul>
   `);


        socket.end();
      });
    });
  });

  socket.on("error", console.log);
});

server.listen(8080)