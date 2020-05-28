const net = require('net')

const server = net.createServer(socket => {
    
    
    socket.on('data',data => {
    
       

        socket.write(`i send you back your message in upper case :P ${data.toString().toUpperCase()}`)
    }), ('name', name => {
        socket.name = name
        console.log(socket)
    })

    socket.on('error', console.log)
})

server.listen(8080)