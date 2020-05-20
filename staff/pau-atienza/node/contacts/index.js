const net = require('net')
const listContacts = require('./logic/list-contacts')

const server = net.createServer(socket => {
    socket.on('data', data => {
        listContacts((error, contacts) => {
            if (error) throw error
            const extractedData = {}
            data.toString().split('\r').forEach(string => {
                if(string[0].trim() === '{'){extractedData.body = string}
                else{
                    splitString = string.split(':')
                    if (splitString[1]) extractedData[splitString[0].trim()] = splitString[1].trim()
                    else if(splitString[0].trim()) extractedData['protocol'] = splitString[0].trim()               
                }
            })
            console.log(extractedData)
            console.log(extractedData['User-Agent'])
            
            if(!extractedData['Content-Type'] && extractedData['protocol'].includes('GET')){
                socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
</ul>
`)          
            }

            socket.end()
        })
    })

    socket.on('error', console.log)
})

server.listen(8080)

