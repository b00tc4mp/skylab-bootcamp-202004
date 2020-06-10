const { Schema } = require('mongoose')
require('misc-commons/polyfills/URL')

module.exports = new Schema({
    storeName: {
        type: String,
        required: true
    },

    typeOfStore: {
        type: String,
        required:true
    },

    location: {
        type: String,
        required: true
    },

    url: {
        type: String,
        validate: [URL.validate, 'invalid url']
    }
})