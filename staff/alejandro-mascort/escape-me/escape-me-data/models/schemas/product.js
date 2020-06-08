const { Schema } = require('mongoose')
require('escape-me-commons/polyfills/url')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    url: {
        type: String,
        validate: [URL.validate, 'invalid url']
    }
})