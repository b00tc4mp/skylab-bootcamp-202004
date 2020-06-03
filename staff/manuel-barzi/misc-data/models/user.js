const mongoose = require('mongoose')

const { utils: { Email } } = require('misc-commons')

const { Schema, SchemaTypes: { ObjectId } } = mongoose

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

    cart: {
        type: [{
            product: {
                type: ObjectId,
                ref: 'Product',
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }
        }],

        required: false
    },

    orders: {
        type: [{
            products: {
                type: [{
                    product: {
                        type: ObjectId,
                        ref: 'Product',
                        required: true
                    },

                    quantity: {
                        type: Number,
                        required: true
                    }
                }],

                required: true
            },

            amount: {
                type: Number,
                required: true
            },

            date: {
                type: Date,
                required: true
            }
        }]
    }
})