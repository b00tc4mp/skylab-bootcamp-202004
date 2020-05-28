const registerUser = require('./register')

const newUser = {
    name: 'sergi',
    surname: 'ramos',
    email: 'sergi2@mail.com',
    password: '123123123'
}

registerUser(newUser, console.log) 
   



