const unregisterUser = require('./unregister')

const user = {
    name: 'sergi',
    surname: 'ramos',
    email: 'sergi2@mail.com',
    password: '123123123'
}

unregisterUser(user.email,user.password, console.log) 
   

