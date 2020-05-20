const net = require('net')

let messages = []
let clients = []

const server = net.createServer(socket => {
    socket.on('data', data => {
        // const [name] = data.split(':')
        // // check name if name do not push
        // socket.username = name
        if (!clients.some(client => client === socket))
            clients.push(socket)

        // console.log(data.toString())
        // messages.push(data.toString())

        clients.forEach(client => {
            client.write(data.toString())
        })
    })

    socket.on('error', console.log)
})

server.listen(8080)