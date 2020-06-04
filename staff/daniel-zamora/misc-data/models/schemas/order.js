const { Schema } = require('mongoose')

const productQuantity = require('./product-quantity')

module.exports = {
    products: {
        type: [productQuantity],
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}