require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose } = require('misc-data')
const placeOrder = require('./place-order')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            return placeOrder('5ed8dcc4bdbe512ef5cb37dd')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })