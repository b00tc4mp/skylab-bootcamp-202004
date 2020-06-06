  const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports= new Schema({
    product:{
        type:ObjectId,
        ref: "Product",
        required:true
    },
    discount:{
        type: Number,
        required:true
    }
})