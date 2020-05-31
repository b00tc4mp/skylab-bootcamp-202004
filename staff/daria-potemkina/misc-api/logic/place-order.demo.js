require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')
const placeOrder = require('./place-order')

mongo.connect(MONGODB_URL)
    .then(() => {
        try {
            return placeOrder('5ed0f11b5322491a5a887b2d')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })