require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')
const removeFromCart = require('./remove-from-cart')

mongo.connect(MONGODB_URL)
    .then(() => {
        try {
            return removeFromCart('5ed265c18e6e02db6a9d4910', '5ed2405381bcf6b01d9e38aa')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })