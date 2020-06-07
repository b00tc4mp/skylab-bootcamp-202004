const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    challenges: {
        type: [ObjectId],
        ref: 'challenge',
        required: true
    }
})
module.exports = Category