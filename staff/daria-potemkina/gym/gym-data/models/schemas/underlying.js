const {Schema} = require('mongoose')
const price = require('./price')

module.exports = new Schema ({
    ticker: {
        type: String,
        required: true
    },
    prices: [price]
})