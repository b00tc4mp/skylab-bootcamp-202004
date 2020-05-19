const net = require('net')

const server = net.createServer(socket => {
    socket.on('data', data => {
        socket.write(`HTTP/1.1 200
content-type: text/html

<h1>hola mundo</h1>`)

        socket.end()
    })

    socket.on('error', console.log)
})

server.listen(8080)