const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const comment = require('./comment')

module.exports = new Schema({
    escapeRoom: {
        type: ObjectId,
        // ref: 'EscapeRooms',
        required: true
    },

    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        required: true
    },

    comment: comment
})