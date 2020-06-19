const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')



module.exports = new Schema({

    userId:{
        type: ObjectId,
        ref: 'User',
        required: true
    },

    message: {
        type: String,
        required: true
    },

    date: {
        stringDay:{
            type: String,
            require:true
        },
        day:{
            type: Number,
            require: true
        },
        month: {
            type: String,
            require: true
        },
        hour: {
            type: String,
            require: true
        }
    }

})