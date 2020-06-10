const { Types: { ObjectId }, Schema } = require('mongoose')

module.exports = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    
    date: {
        type: Date,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
})