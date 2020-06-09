const { Schema, SchemaType: { ObjectId } } = require('mongoose')
// require('escape-me-commons/polyfills/url')
// const punctuation = require('./punctuation')

module.exports = new Schema({
    escapeRoom: {
        type: ObjectId,
        required: true
    },

    // description: {
    //     type: String,
    //     required: true
    // },

    // priceMin: {
    //     type: Number,
    //     required: true
    // },

    // priceMax: {
    //     type: Number,
    //     required: true
    // },

    // playersMin: {
    //     type: Number,
    //     required: true
    // },

    // playersMax: {
    //     type: Number,
    //     required: true
    // },

    // genre: {
    //     type: String,
    //     required: true
    // },

    // url: {
    //     type: String,
    //     validate: [URL.validate, 'invalid url'],
    //     required: true
    // }

    // reviews: [punctuation]
})