const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const { utils: { Email } } = require('books-commons')
const following = require('./following')
const rating = require('./rating')
const book = require('./book')
const message = require('./message')

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
    books:[book],

    following :[following],

    rating:[rating],

    sendMessages:[{type: ObjectId, ref: 'Message'}],

    receivedMessages:[{type: ObjectId, ref: 'Message'}],

    ratingAvg:{
        type: Number
    },

    localizationGps:{
        lat: {
            type:Number
        },
        lon:{
            type:Number
        },
    }
})