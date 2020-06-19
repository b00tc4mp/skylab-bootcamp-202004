const { Schema, Types: { ObjectId } } = require('mongoose')
const trade = require('./trade')

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },

    isValid: {
        type: Boolean
    },

    trades: [trade]
})