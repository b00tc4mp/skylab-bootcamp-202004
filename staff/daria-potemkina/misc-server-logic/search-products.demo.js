require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')

const searchProducts = require('./search-products')

mongo.connect(MONGODB_URL)
    .then(() => searchProducts('phone'))
    .then(console.log)
    .catch(console.error)