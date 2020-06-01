require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const updateCart = require('./update-cart')

mongo.connect(MONGODB_URL)
    .then(() =>
        updateCart("5ed51a0034390806696d1646", '5ed4d71d9569dfdc03e519f8', 5)
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)