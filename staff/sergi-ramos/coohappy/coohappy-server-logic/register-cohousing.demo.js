require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose } = require('coohappy-data')
const registerCohousing = require('./register-cohousing')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
     
            return registerCohousing('La floca18', {street: 'c/Sants', number: 22, city: 'barcelona'}, '5edf409a012a51104112b01d')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })