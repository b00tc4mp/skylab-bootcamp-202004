const { Schema, Types: { ObjectId } } = require('mongoose')
const productQuantity = require('./product-quantity')

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    products: {
        type: [productQuantity],
        required: true
    },

    date: {
        type: Date,
        required: true
    }
})