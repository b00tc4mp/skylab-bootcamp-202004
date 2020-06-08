const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    chatId: {
        type: ObjectId,
        ref: 'chat',
        required: true
    }
})