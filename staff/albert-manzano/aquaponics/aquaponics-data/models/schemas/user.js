const { Schema } = require('mongoose')
const { utils: { Email } } = require('aquaponics-commons')
const event = require('./event')

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

    role:{
        enum:["admin","user"],
        type: String
    },

    confirmed: {
        type:Boolean,
        default : false
    },

    status:{
        enum:[enable,disable]
    },

    phone: {
        type:Number,
        required:true
    },

    events: [event], 
})