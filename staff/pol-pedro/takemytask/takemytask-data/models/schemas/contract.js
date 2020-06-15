const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema ({

    user: {
        type: ObjectId,
        require: true
    },

    worker: {
        type: ObjectId,
        require: true
    },

    dateContracted : {
        type: Date,
        require: true
    },

    dateOfContract : {
        type: Date,
        require: true
    },

    estimateDuration: {
        type: Number,
        require: true
    },

    accepted: {
        type: Boolean,
        require: true
    },

    finished: {
        type: Boolean,
        require: true
    }

})