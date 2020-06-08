const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    userId: {
        type: ObjectId,
        ref:'Users',
        required: true
    },
    points:{
        type:Number,
        required: true
    }
})