require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongo } = require('misc-data')
const registerUser = require('./register-user')

mongo.connect(MONGODB_URL)
    .then(() => {
        try {
            //registerUser('Pepito', 'Grillo', 'pepigri@mail.com', '123')
            return registerUser('Menga', 'Nito', 'menganito@mail.com', '123')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })
