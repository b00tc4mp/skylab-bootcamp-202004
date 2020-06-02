require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const updateCart = require('./update-cart')

mongo.connect('mongodb://localhost:27017/misc-api')
    .then(() =>
        updateCart('5ed385a70bc3e92d518721e7', '5ed3d2db8536c57ffd235653', 5)
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)