require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const placeOrder = require('./place-order')

mongo.connect('mongodb://localhost:27017/misc-api')
    .then(() =>
        placeOrder('5ed385a70bc3e92d518721e7')
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)