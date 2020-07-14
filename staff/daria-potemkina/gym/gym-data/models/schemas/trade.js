const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    price: {
        type: ObjectId,
        ref: 'Price',
        required: true
    },

    type: {
        type: String,
        enum: ['Buy', 'Sell'],
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }

})