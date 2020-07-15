 
const net = require('net')

const connections ={}

const server = net.createServer(connection => {
    connection.setDefaultEncoding('utf8')
    connection.on('data', data => {
        if(data.startsWtih('FROM')){
            data.split(':').map(item => item.trim())

            connections[name]=connection
        }

        
    })

    connection.on('error', console.log)
})

server.listen(8080)