require('dotenv').config()

// const { env: { MONGODB_URL } } = process
// const { mongoose } = require('misc-data')

const placeOrder = require('./place-order')


    try {   
        return placeOrder("5ed54d5c65c07a3d8bbd0c9b")
            .then(() => console.log('OK'))
            .catch(error => console.error('KO async', error))
    } catch (error) {
        console.error('KO sync', error)
    }

