const { Schema } = require('mongoose')
const { utils: { Email } } = require('gym-commons')

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
        },
        holder: {
            type: String,
        },
        expirationDate: {
            type: Date,
        },
        cvv: {
            type: String,
        }
    }
})