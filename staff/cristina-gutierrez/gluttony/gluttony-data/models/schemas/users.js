const { Schema } = require("mongoose")
const { utils: { Email } } = require('gluttony-commons')
const favorites = require('./favorites')
const comments = require('./comments')

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

    favorites: [favorites],

    comments: [comments]
})