const { Schema } = require('mongoose')
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
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    },

    planes: [blueprint],

    favPlanes: [order]
})