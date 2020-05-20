const net = require('net')

const connections = {}

const server = net.createServer(connection => {
    connection.on('data', data => {
        data = data.toString()
        
        if (data.startsWith('FROM')) {
            const [, name] = data.split(':').map(item => item.trim())

            connections[name] = connection
        } else {
            const [name, message] = data.split(':').map(item => item.trim())

            const names = Object.keys(connections)

            let _name

            for (let i = 0; i < names.length && !_name; i++) {
                const name = names[i]
                
                if (connections[name] === connection) _name = name
            }

            const _connection = connections[name]

            _connection.write(`${_name}: ${message}`)
        }
    })

    connection.on('error', console.log)
})

server.listen(8080)