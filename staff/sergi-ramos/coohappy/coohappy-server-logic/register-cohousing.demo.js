require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose } = require('coohappy-data')
const registerUser = require('./register-cohousing')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
     
            return registerUser('La floca', {street: 'c/Sants', number: 22, city: 'barcelona'}, '5ede11fb78f6ad3d8125d244')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })