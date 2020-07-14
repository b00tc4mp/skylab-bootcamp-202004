const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const productQuantity = require('./product-quantity')
module.exports= new Schema({
    name: {
        type: String,
        required:true
    },
    products:{
        type:[productQuantity],
        required:true
    }
})