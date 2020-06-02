require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const updateCart = require('./update-cart')

mongo.connect(MONGODB_URL)
    .then(() =>
        updateCart('5ed3ca3b5322491a5a887b2f', '5ed38af7fd95209e1c9efe8e', 1)
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)