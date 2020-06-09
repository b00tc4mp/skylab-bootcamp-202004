const { Schema } = require('mongoose')
const { utils: { Email } } = require('escape-me-commons')
const punctuation = require('./punctuation')
require('escape-me-commons/polyfills/url')

module.exports = new Schema({
    name: String,

    surname: String,

    username: {
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

    participated: [escapeRoom],

    pending: [escapeRoom],

    favorites: [escapeRoom],

    following: [],

    ratings: [punctuation],

    image: String
})