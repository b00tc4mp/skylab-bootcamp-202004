const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const coments = require('./coments')

module.exports = new Schema ({

    user: {
        type: ObjectId,
        require: true,
        ref: 'User'
    },

    worker: {
        type: ObjectId,
        require: true,
        ref: 'Worker'
    },

    messages : [coments],

    date : {
        type: Date,
        require: true
    }
})