const { Schema } = require('mongoose')

const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

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
        unique: true

    },

    password: {
        type: String,
        required: true
    },

    planes: {
        type: [ObjectId], 
        ref: 'Blueprint'
    },

    // favPlanes: {
    //     type: [ObjectId], 
    //     ref: 'Blueprint'
    // }
})