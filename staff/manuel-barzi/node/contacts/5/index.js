const net = require('net')
const listContacts = require('./logic/list-contacts')

const server = net.createServer(socket => {
    socket.on('data', data => {
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
    })

    socket.on('error', console.log)
})

server.listen(8080)

