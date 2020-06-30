const { Schema, Types: {ObjectId} } = require('mongoose')
const { utils: { Email } } = require('work-meeting-commons')

//const order = require('./order')

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

    workGroups:[{
        type: ObjectId,
        ref: 'WorkGroup'
    }]
    
})