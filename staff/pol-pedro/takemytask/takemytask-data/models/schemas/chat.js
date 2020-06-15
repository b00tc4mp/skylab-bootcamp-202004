const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const coments = require('./comments')

module.exports = new Schema ({

    user: {
        type: ObjectId,
        require: true
    },

    worker: {
        type: ObjectId,
        require: true
    },

    messages : [coments],

    date : {
        type: Date,
        require: true
    }
})