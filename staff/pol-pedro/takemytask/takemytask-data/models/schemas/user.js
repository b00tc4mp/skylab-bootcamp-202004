const { utils: { Email } } = require('takemytask-commons')
const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({

    role: {
        type: String,
        default: 'user'
    },

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

    adress: {
        type: String,
        required: true
    },

    chat: [{type: ObjectId, ref: 'chat'}],

    contracts : [{type: ObjectId, ref: 'contract'}]

})