const net = require('net')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const addContact = require('./logic/add-contact')
const extractInputs = require('./logic/extract-inputs')

const server = net.createServer(socket => {
    socket.on('data', data => {
        const [line] = data.toString().split('\n')
        
        const [method, path] = line.split(' ').map(item => item.trim())

        if (path === '/contacts') {
            listContacts((error, contacts) => {
                if (error) throw error
    
                socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
</ul>
`)
                socket.end()
            })
        } else if (path.startsWith('/contacts') && path.includes('?')) {
            const [, queryString] = path.split('?')

            const [, query] = path.split('=')

            searchContacts(query, (error, contacts) => {
                if (error) throw error

                socket.write(`HTTP/1.1 200
content-type: text-html

<h2>Contacts list</h2>
<ul>
    ${contacts.map(({name, surname}) => `<li>${name} ${surname}</li>`).join('')}
</ul>`)

                socket.end()
            })
        } else if(path === '/add-contact') {
            if (method === 'GET') {
                socket.write(`HTTP/1.1 200
content-type: text-html

<h2>Add contact</h2>
<form action="/add-contact" method="POST">
            <input type="text" name="name">
            <input type="text" name="surname">
            <input type="email" name="email">
            <input type="text" name="phone">
            <button>Add</button>
</form>
`)
                socket.end()
            } else if (method === 'POST') {

                const contact = extractInputs(data.toString())
                addContact(contact, error => {
                    if (error) {
                        socket.write(`HTTP/1.1 200
content-type: text-html

<h2>Cannot add contact :(</h2>`)
                    } else {
                        socket.write(`HTTP/1.1 200
content-type: text-html

<h2>User added succesfully</h2>`)
                    }
                    socket.end()
                })
                
            }
        } else {
            socket.write(`HTTP/1.1 404
content-type: html-text

<h2>Not Found :(</h2>
`)
            socket.end()
        }
        
    })

    socket.on('error', console.log)
})

server.listen(8080)