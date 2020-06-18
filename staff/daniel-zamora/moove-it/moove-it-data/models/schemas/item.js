const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    x: {
        type: Number,
        required: true,
        default: 0
    },

    y: {
        type: Number,
        required: true,
        default: 0
    },

    z: {
        type: Number,
        required: true,
        default: 0
    },

    orientation: {
        type: Number,
        required: true,
        default: 0
    },

    width: {
        type: Number,
        required: true,
        default: 1
    },

    height: {
        type: Number,
        required: true,
        default: 1
    },

    // image: String
})