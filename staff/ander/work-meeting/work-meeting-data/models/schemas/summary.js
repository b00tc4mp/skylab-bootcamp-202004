const { Schema, Types: { ObjectId } } = require('mongoose')


module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    meeting: {
        type: ObjectId,
        ref: 'Meeting',
        required: true
    },
    members: [{
        type: ObjectId,
        ref: 'User'
    }],

    readBy: [{
        type: ObjectId,
        ref: 'User'
    }],
    workGroup: {
        type: ObjectId,
        ref: 'WorkGroup'
    },
    date: {
        type: Date,
        default: Date
    }

})  