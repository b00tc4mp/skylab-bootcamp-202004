const { Types: { ObjectId }, Schema } = require('mongoose')

module.exports = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    
    date: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
})