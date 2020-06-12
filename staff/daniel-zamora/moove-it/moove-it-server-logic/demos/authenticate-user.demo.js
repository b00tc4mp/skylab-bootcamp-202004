require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const authenticateUser = require('../authenticate-user')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            return authenticateUser('daniel@mail.com', '123123123')
                .then((id) => console.log(`Welcome! ${id}`))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })