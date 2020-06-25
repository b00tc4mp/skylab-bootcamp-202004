const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


module.exports = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },

    name: {
        type: String,
        require: true
    },

    surname: {
        type: String,
        require: true
    },

    text: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        require: true
    }
})