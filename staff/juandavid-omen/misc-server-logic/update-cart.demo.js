require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')

const updateCart = require('./update-cart')

mongo.connect(MONGODB_URL)
    .then(() =>
        updateCart('5ed2e2912b3f14170e814991', '5ed4d71d9569dfdc03e519f8', 5)
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)