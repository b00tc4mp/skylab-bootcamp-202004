const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const { utils: { Email } } = require('misc-commons')
const following = require('./following')
const rating = require('./rating')
const books = require('./books')
const messages = require('./messages')

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
    books:[books],

    following :[following],

    rating:[rating],

    recivedMessages:[messages],

    ratingAvg:{
        type: Number
    },

    localizationGps:{
        lat: {
            type:Number,
            required: true
        },
        lon:{
            type:Number,
            required: true
        },
    }
})