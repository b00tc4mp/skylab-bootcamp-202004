require('dotenv').config()
debugger
const { MONGODB_URL } = process.env
const { mongo } = require('misc-data')
const registerUser = require('./register-user')

mongo.connect(MONGODB_URL)
    .then(() => {
        try {
            return registerUser('Menga', 'Nito', 'menganito@mail.com', '123')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })