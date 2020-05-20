const net = require('net')
const users = []

const server = net.createServer(socket => {
    socket.on('user', data => {
        users.push(data.toString())
        socket.write(`${users}i send you back your message in upper case :P ${data.toString().toUpperCase()}`)
    })
    socket.on('error', console.log)
})

server.listen(8080)