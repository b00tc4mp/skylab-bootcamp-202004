require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')

const retrieveCart = require('./retrieve-cart')

mongo.connect(MONGODB_URL)
    .then(() => retrieveCart('5ed265c18e6e02db6a9d4910'))
    .then(console.log)
    .catch(console.error)