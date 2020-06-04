const { Schema } = require('mongoose')
const { utils: { Email } } = require('misc-commons')
const order = require('./order')
const productQuantity = require('./product-quantity')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate, 'invalid email']
    },

    password: {
        type: String,
        required: true
    },

    cart: [productQuantity],
   
    orders: [order]   
})