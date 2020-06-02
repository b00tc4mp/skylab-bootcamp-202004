require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const placeOrder = require('./place-order')

mongo.connect('mongodb://localhost:27017/misc-api')
.then(() => {
    try {
        
        return placeOrder("5ed0f0e0f24a933c0a5e90e1")
            .then(() => console.log('OK'))
            .catch(error => console.error('KO async', error))
    } catch (error) {
        console.error('KO sync', error)
    }
})
