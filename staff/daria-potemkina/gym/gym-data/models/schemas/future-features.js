const { Schema } = require('mongoose')
const price = require('./price')

module.exports = new Schema({
    expirationDate: {
        type: Date,
        required: true
    },
    prices: [price]
})