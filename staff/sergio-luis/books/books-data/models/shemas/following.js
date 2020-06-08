const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    following: {
        type: ObjectId,
        ref:'Users',
        required: true
    },
})