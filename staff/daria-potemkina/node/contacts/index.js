const net = require('net')
const listContacts = require('./logic/list-contacts')
const searchContacts = require('./logic/search-contact')
const addContact = require('./logic/add-contact')

const server = net.createServer(socket => {
    socket.on('data', data => {
        const [line] = data.toString().split('\n')

        const [method, path] = line.split(' ').map(item => item.trim())
        debugger

        if (path === '/contacts') {
            listContacts((error, contact) => {
                if (error) throw error

                socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
    ${contact.map(({ id, name, surname, email }) => `<li>${id}: ${name} - ${surname} - ${email}</li>`).join('')}
</ul>
`)
                debugger
                socket.end()
            })
        } else if (path.startsWith('/contacts') && path.includes('?')) {
            const [, queryString] = path.split('?')
            const [, query] = queryString.split('=')

            debugger

            searchContacts(query, (error, contacts) => {
                if (error) throw error

                socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
    ${contacts.map(({ id, name, surname, email }) => `<li>${id}: ${name} - ${surname} - ${email}`).join('')}
</ul>
`)
                socket.end()
            })
        } else if (path === '/add-contact') {
            if (method === 'GET') {
                socket.write(`HTTP/ 1.1 200
content-type: text/html

<h2>Add contact</h2>
<form action="/add-contact" method="POST">
    <input type="text" name="name" placeholder="John">
    <input type="text" name="surname" placeholder="Doe">
    <input type="email" name="email" placeholder="johndoe@mail.com">
    <input type="tel" name="phone" placeholder="+34 123-45-67-89">
    <input type="date" name="birthdate">
    <input type="text" name="country", placeholder="Spain">
    <button>Add</button>
</form>
`)
                socket.end()
            }else if (method === "POST"){
                const[,,,,,,,,,,,,,,,,,,user] = data.toString().split('\n')
                const[name, surname, email, phone, birthdate, country] = user.split('&')
                
                const[, _name] = name.split('=')
                const[, _surname] = surname.split('=')
                const[, _email] = email.split('=')
                const __email = _email.replace('%40', '@')
                const[, _phone] = phone.split('=')
                const[, _birthdate] = birthdate.split('=')
                const[, _country] = country.split('=')
                
                const obj = {
                    name: _name,
                    surname: _surname,
                    email: __email,
                    phone: _phone,
                    birthdate: _birthdate,
                    country: _country
                }
                debugger
                addContact(obj, error =>{
                    if (error) throw error
                    debugger
                    socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Add contact</h2>
<p>Contact saved</p>
`)    
                    socket.end()
                })
            }
        }
        else {
            socket.write(`HTTP/1.1 404
content-type: text/html

<h2>Not Found</h2>
`)
            socket.end()
        }
    })
    socket.on('error', console.log)
})

server.listen(8080)