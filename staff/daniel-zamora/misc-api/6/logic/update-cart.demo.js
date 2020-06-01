require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const updateCart = require('./update-cart')

mongo.connect(MONGODB_URL)
    .then(() =>
        updateCart('5ed4e83483b4275a68c49977', '5ed4e9eccf94b7b9d8b150c8', 25)
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)