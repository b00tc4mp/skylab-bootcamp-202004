require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const registerUser = require('./register-user')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try{
        
            return registerUser('dani', 'zamora', 'daniel@mail.com', '123123123', '123123123')
                .then(() => console.log('registered!'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })