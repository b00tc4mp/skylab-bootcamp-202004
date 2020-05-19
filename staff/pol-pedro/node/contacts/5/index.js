const net = require('net')
const listContacts = require('./logic/list-contacts')
const path = require("path")
const saveSocket= require("./logic/test")

const server = net.createServer(socket => {
    
    socket.on('data', data => {
        saveSocket.setSocket(socket)
        socket.write(`HTTP/1.1 200
content-type: text/html
<script src="./logic/test.js"></script>


<button onclick="list()">Lista</button>

</ul>
`)
socket.end()
        
    })

    socket.on('error', console.log)
})


server.listen(8080)

const list=()=>{
    listContacts((error, 
        contacts) => {
        if (error) throw error

        saveSocket.write(`HTTP/1.1 200
content-type: text/html


<h2>Contacts list</h2>
<ul>
${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
</ul>
`)
    saveSocket.end()  
})
}


////////////////////////////////////////////////////////
`HTTP/1.1 200
content-type: text/html

<script src=

<form onsubmit="search()">
<input type="text">
<sumit/>
</form>
`
