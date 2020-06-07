const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    product: {
        type: ObjectId,
        refPath: 'onModel'
    },

    onModel: {
        type: String,
        required: true,
        enum: ['Future', 'Option']
    },

    quantitySold: {
        type: Number
    },

    quantityPurchased: {
        type: Number
    }
})