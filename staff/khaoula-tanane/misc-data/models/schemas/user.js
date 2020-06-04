const { Schema } = require('mongoose')
const { utils: { Email } } = require('misc-commons')
const productQuantity = require('./product-quantity')
const order = require('./order')

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
        validate: [Email.validate, 'invalid e-mail']
    },

    password: {
        type: String,
        required: true
    },

    nickname: String,

    cart: [productQuantity],

    orders: [order]
})