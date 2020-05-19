const searchContact = require('../logic/search-contacts');
const readline = require('readline');
const net = require('net');

(function SearchContact() {
    
    const interface = readline.Interface({
        input: process.stdin,
        output: process.stdout
    })

    interface.question('Search for a user: ', query => {
        searchContact(query, (error, contacts) => {
            if(error) throw new Error(error)
            if(contacts) interface.close()
//m'instalo hangouts  bueno el pots obrir des
            const server = net.createServer(socket => {
                socket.on('data', data => {
                    console.log(data)
                    socket.write(`HTTP/1.1 200
                    content-type: text/html
                    
                    <ul>
                        ${contacts.forEach(({name, surname, phone, email, country}) => {
                            `<li>${name},${surname},${phone},${email},${country}</li>`
                            console.log("hello world")
                        })}
                    </ul>

                    `)
                    socket.end()
                })

                socket.on('error', console.log)

            })
            server.listen(8080, () => {
                console.log("server start")
            })
            
            
        }) 
    })
}())