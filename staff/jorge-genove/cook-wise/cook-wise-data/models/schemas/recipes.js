const { Schema } = require('mongoose')
const ingredientsQuantity = require('./ingredients-quantity')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    ingredients: [ingredientsQuantity] ,
    

    description: {
        type: String,
        required: true
    },

    time: {
        type: Number,
        required: true
    }
})