const net = require('net')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const addContact = require('./logic/add-contact')
const extractInfo = require('./logic/utils/extract-info')

const server = net.createServer(socket => {
    socket.on('data', data => {
        listContacts((error, contacts) => {
            if (error) throw error
            
            extractedData = extractInfo(data)
            const {path, method} = extractedData
            if (path === '/contacts') {
                listContacts((error, contacts) => {
                    if (error) throw error

                    socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
</ul>`)
                socket.end();
            })
            } else if (path.startsWith('/search') && path.includes('?')) {
                const [ , query ] = path.split('?q=');
                searchContacts(query, (error, searchResults) => {
                    if (error) throw error
                
                    socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
${searchResults.map(({ name }) => `<li>${name}</li>`).join('')}
</ul>`)
                socket.end()
            })
            } else if (path === '/addcontacts') {
                if (method === 'GET') {
                    socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Add Contacts</h2>
<form action="/addcontacts" method="POST">
<input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
<input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
<input type="email" name="email" placeholder="e-mail" required />
<input type="password" name="password" placeholder="password" required minLength="8" />
<button>TRAP</button>
</form>
`)
                socket.end();
            }
            if (method === 'POST') {
                const contact = {};
                const lines = data.toString().split('\n');
                const finalLine = lines[lines.length - 1];
                finalLine.split('&').forEach((element) => {
                    contact[element.split('=')[0]] = element.split('=')[1];
                })

                contact.email = decodeURIComponent(contact.email);

                addContact(contact, (error) => {
                    if (error) {
                        socket.write(`HTTP/1.1 400
content-type: text/html
                
<h2>Problem</h2>
`)
socket.end();
                    } else {
                        socket.write(`HTTP/1.1 204
content-type: text/html

<h2>Succed</h2>
`)
socket.end();
                    }
                })
            }			
        }
    })
    socket.on('error', console.log);
})
            
})



server.listen(8080)

// const net = require('net');
// const listContacts = require('./logic/list-contacts');
// const searchContacts = require('./logic/search-contacts');
// const addContact = require('./logic/add-contact');

// const server = net.createServer((socket) => {
// 	socket.on('data', (data) => {
// 		const [ line ] = data.toString().split('\n');
// 		const [ method, path, , ] = line.split(' ');

// 		if (path === '/contacts') {
// 			listContacts((error, contacts) => {
// 				if (error) throw error;

// 				socket.write(`HTTP/1.1 200
// content-type: text/html

// <h2>Contacts list</h2>
// <ul>
// ${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
// </ul>`);
// 				socket.end();
// 			});
// 		} else if (path.startsWith('/search') && path.includes('?')) {
// 			const [ , query ] = path.split('?q=');
// 			searchContacts(query, (error, searchResults) => {
// 				if (error) throw error;
// 				debugger;
// 				socket.write(`HTTP/1.1 200
// content-type: text/html

// <h2>Contacts list</h2>
// <ul>
// ${searchResults.map(({ name }) => `<li>${name}</li>`).join('')}
// </ul>`);
// 				socket.end();
// 			});
// 		} else if (path === '/addcontacts') {
// 			if (method === 'GET') {
// 				socket.write(`HTTP/1.1 200
// content-type: text/html

// <h2>Add Contacts</h2>
// <form action="/addcontacts" method="POST">
// <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
// <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
// <input type="email" name="email" placeholder="e-mail" required />
// <input type="password" name="password" placeholder="password" required minLength="8" />
// <button>TRAP</button>
// </form>
// `);

// 				socket.end();
// 			}
// 			if (method === 'POST') {
// 				const contact = {};
// 				const lines = data.toString().split('\n');
// 				const finalLine = lines[lines.length - 1];
// 				finalLine.split('&').forEach((element) => {
// 					contact[element.split('=')[0]] = element.split('=')[1];
// 				});

// 				contact.email = decodeURIComponent(contact.email);

// 				addContact(contact, (error) => {
// 					if (error) {
// 						socket.write(`HTTP/1.1 400
// content-type: text/html
                
// <h2>Problem</h2>
// `);
// socket.end();
// 					} else {
// 						socket.write(`HTTP/1.1 204
// content-type: text/html

// <h2>Succed</h2>
// `);
// socket.end();
// 					}
// 				});
// 				debugger;
// 			}			
// 		}
// 	});
// 	socket.on('error', console.log);
// });

// server.listen(8081);


