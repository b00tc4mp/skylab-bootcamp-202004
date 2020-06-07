const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const { utils: { Schema } } = require('coohappy-commons')


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
        type: Date,
        required: true
    }

})