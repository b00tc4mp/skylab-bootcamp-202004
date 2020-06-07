const { Schema } = require('mongoose')
const price = require('./price')

module.exports = new Schema({
    expiratinDate: {
        type: Date,
        required: true
    },
    prices: [price]
})