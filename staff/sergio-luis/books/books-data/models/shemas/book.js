const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
require('misc-commons/polyfills/URL')
const message = require('./message')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String,
        validate: [URL.validate, 'invalid url']
    },

    description: {
        type: String,
    },

    industryIdentifiers: {
        type: {
            type: String,
            required: true
        },
        identifier: {
            type: String,
            required: true
        }
    },

    travelKm:{
        type:Number,
        required: true
    },

    ownerId: {
        type: ObjectId,
        ref:'User',
        required: true
    },

    actualUserId:{
        type: ObjectId,
        ref:'User',
    },

    messsages:[message],

    atHome:{
        type: Boolean,
    },

    shared:{
        type: Boolean,
    },

    requested:{
        type: Boolean,
    }

})