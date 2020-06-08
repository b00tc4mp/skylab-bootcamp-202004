const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    book:{
        type:ObjectId,
        ref:'Book',
        require:true
    },

    messageFrom:{
        type:ObjectId,
        ref:'User',
        required:true
    },

    textMessage: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        required: true
    },


})