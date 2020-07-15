const net = require('net')
const messages = []
const sockets = []

const server = net.createServer(socket => {
    socket.on('data', data => {

        console.log(data.toString())
        let _clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
        console.log(_clientAddress)
        // console.log(socket)
        messages.push(data.toString())
        console.log(messages)
        sockets.forEach(({socket, clientAddress, client}) => {
            (clientAddress !== _clientAddress) && socket.write(`Client ${client}: ${data.toString()}`)
        })
    })

    socket.on('error', console.log)
})

server.on('connection',  (socket) => { 
    var clientAddress = `${socket.remoteAddress}:${socket.remotePort}`; 
    console.log(`new client connected: ${clientAddress}`); 
    sockets.push({socket, clientAddress, client: sockets.length+1})
    }
)

server.listen(8080)