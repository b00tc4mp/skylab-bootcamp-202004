const { Schema } = require('mongoose')
require('misc-commons/polyfills/URL')

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