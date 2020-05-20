const net = require('net')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contacts')
const addContact = require('./logic/add-contact')

// recorda de trure sempre els dubbugers, en una api no funcionen com en el front i te la lienvale
// per això uso mes el console.log que el debbuger
const server = net.createServer(socket => {
    socket.on('data', data => {
    
        const [line] = data.toString().split('\n')

        const [method, path, ,] = line.split(' ')
// mira
        if (path === '/contacts') { // aquest es sense query OK
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
        } else if (path.startsWith("/contacts") && path.includes ("?")) { // si vols un altre edia t'explico perque ho deixo així
            const [, query] = path.split('?q=')

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