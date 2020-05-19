const net = require('net')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const addContact = require('./logic/add-contact')

const server = net.createServer(socket => {
    socket.on('data', data => {
        debugger
        const [line] = data.toString().split('\n')

        const [method, path, ,] = line.split(' ')

        if (path === '/contacts') {
            listContacts((error, contacts) => {
                if (error) throw error
                debugger
                socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
</ul>
`)
                socket.end()
            })
        } else if (path.startsWith("/contacts") && path.includes ("?")) {
            const [, query] = path.split('?q=')

            debugger

            searchContacts(query, (error, contacts) => {
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
        } else if (path === '/add-contact') {
            debugger
            addContact(contact, (error, contacts) => {
                if (method === 'GET') {
                    socket.write(`HTTP/1.1 200
    content-type: text/html

    <h2>Add Contacts</h2>
    <form action="/add-contact" method="POST">
        <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
        <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
        <input type="email" name="email" placeholder="email" required />
        <input type="text" name="password" placeholder="password" required minLength="8" />
        <button>Submit</button>
    </form>
    `);
                    debugger
                    socket.end();
                }
                if (method === 'POST') {
                    socket.write(`HTTP/1.1 200
    content-type: text/html`)
                    const contact={}
                    const lines = data.toString().split("\n")
                    const finalLine =(lines[lines.length - 1])
                    finalLine.split("&").forEach(element=>{
                        contact[element.split("=")[0]]=element.split("=")[1]
                    })
    // TODO call addContact and return a feedback message => "contact saved"

                    socket.end()
                }
            })

        }
    })
    socket.on('error', console.log)
})

server.listen(8080)