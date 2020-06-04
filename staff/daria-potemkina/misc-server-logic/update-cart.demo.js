require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')

const updateCart = require('./update-cart')

mongo.connect(MONGODB_URL)
    .then(() =>
        updateCart('5ed8dcc4bdbe512ef5cb37dd', '5ed8dc5d1e54692e7cf9f0c2', 3)
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)