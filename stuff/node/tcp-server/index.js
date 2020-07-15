const net = require('net')

const server = net.createServer(socket => {
    socket.on('data', data => {
        //console.log(data.toString())

        socket.write(`i send you back your message in upper case :P ${data.toString().toUpperCase()}`)
    })

    socket.on('error', console.log)
})

server.listen(8080)