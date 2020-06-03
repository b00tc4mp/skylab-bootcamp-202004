require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const searchProducts = require('./search-products')

mongo.connect(MONGODB_URL)
    .then(() =>
        searchProducts('blah')
            .then(console.log)
    )
    .catch(console.error)
    .finally(mongo.disconnect)