const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    fromUserId:{
        type:ObjectId,
        ref:'User',
        required:true
    },

    toUserId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    bookId:{
        type:ObjectId,
        ref:'Book',
        require:true
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