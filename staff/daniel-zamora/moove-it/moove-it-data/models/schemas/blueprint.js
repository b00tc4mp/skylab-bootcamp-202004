const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    items: {
        type: [ObjectId],
        ref: 'Item',
    },

    date: {
        type: Date,
        required: true,
        default: Date.now()
    },

   width: {
       type: Number,
       required: true,
       default: 80
   },

   height: {
    type: Number,
    required: true,
    default: 80
   }
   
})