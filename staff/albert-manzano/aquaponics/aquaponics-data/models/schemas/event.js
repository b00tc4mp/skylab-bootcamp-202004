const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    
    date: {
        type: Date,
        required: true
    },

    description: {
        type: String,
        minlength: 8,
        required: true
    }
})