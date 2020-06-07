const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


module.exports = new Schema({

    name: {
        type: String,
        required: true
    },

    street: {
        type: String,
        required: true
    },

    number: {
        type: Number,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    members: [{
        type: ObjectId,
        ref: 'User',
        required: true
    }],

    password: {
        type: String,
        required: true
    },

    foodList: [{
        foodItem: {

            type: ObjectId,
            ref: 'Food',
            required: true

        },

        weight: {
            type: Number,
            required: true
        }
    }]
})


