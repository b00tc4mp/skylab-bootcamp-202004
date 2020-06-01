require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const updateCart = require('./update-cart')
debugger
mongo.connect('mongodb://localhost:27017/misc-api')
    .then(() =>
        updateCart('5ed50b2f6a7b7c3f7a8f635a', '5ed4d71d9569dfdc03e519f8', 5)
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)