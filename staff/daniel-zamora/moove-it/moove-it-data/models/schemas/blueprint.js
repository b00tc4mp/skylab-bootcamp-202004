const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const item = require('./item')

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },

    name: {
        type: String,
        required: true
    },

    items: [item],


    date: {
        type: Date,
        required: true,
        default: Date.now()
    },

    width: {
        type: Number,
        required: true,
        default: 80
    },

    height: {
        type: Number,
        required: true,
        default: 80
    }


})