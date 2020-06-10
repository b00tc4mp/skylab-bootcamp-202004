const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const { utils: {Email} } = require('termometro-commons')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },
    
    sex: {
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

    members: [{
        type: ObjectId,
        ref: 'users'
    }],

    administrator: {
        type: ObjectId,
        ref: 'users'
    }
})

