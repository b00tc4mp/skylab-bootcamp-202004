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
        enum: ['M','F'],
        required: true
    },

    location: {
        type: String,
        required: false
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
        min: 8
    },

    members: [{
        type: ObjectId,
        ref: 'User'
    }],

    admin: {
        type: ObjectId,
        ref: 'User'
    },

    mood: [{
      date: {
          type: String
      },
      score: {
          type: Number
      }
    }]
})

