const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    ingredient: {
        type: ObjectId,
        ref: 'Ingredient',
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
})