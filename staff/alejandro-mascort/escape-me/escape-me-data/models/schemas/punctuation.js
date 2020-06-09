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
        required: true
    },

    comment: comment
})