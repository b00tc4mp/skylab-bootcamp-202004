const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const productQuantity = require('./product-quantity')
module.exports= new Schema({
    client: {
        type: ObjectId,
        ref:"Client",
        required:true
    },
    products:{
        type:[productQuantity],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date //TODO required: true
    },
    paid:{
        type:Boolean,
        required:true
    }
})