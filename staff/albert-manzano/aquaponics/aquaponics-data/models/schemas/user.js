const { Schema, SchemaTypes: {ObjectId} } = require('mongoose')
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
        type: String,
        default:"user",
    },

    confirmed: {
        type:Boolean,
        default : false,
    },

    status:{
        enum:["enable","disable"],
        type:String,
        default : "enable",
    },

    phone: {
        type:Number,
        required:true
    },

    events: [{type: ObjectId, ref: 'Event'}], 
})

// name,surname,email,password,role,confirmed,status,phone