require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')
const placeOrder = require('./place-order')

mongo.connect(MONGODB_URL)
    .then(() => {
        try {
            return placeOrder('5ed3ca3b5322491a5a887b2f')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })