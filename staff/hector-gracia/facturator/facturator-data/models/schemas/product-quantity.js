const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
})