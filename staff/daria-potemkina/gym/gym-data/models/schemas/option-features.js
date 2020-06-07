const { Schema } = require('mongoose')
const price = require('./price')

module.exports = new Schema({
    strike: {
        type: Number,
        required: true
    },
    prices: [price]
})