const { Schema, Types: { ObjectId } } = require('mongoose')
const { utils: { Email } } = require('gym-commons')
const product = require('./product')

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
        required: true,
    },

    card: {
        number: {
            type: String,
            // required: true,
            unique: true
        },
        holder: {
            type: String,
            // required: true,
        },
        expirationDate: {
            type: Date,
            // required: true
        },
        cvv: {
            type: String,
            // required: true
        }
    },

    products: [product],

    guarantee: {
        type: Number
    }
})