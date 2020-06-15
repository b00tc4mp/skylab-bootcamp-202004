const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const { utils: { Rate } } = require('takemytask-commons')

module.exports = new Schema({
    userId: {
        type: ObjectId,
        required: true,
    },

    stars: {
        type: Number,
        require: true,
        validate: [Rate.validate, 'invalid rate number']
    },

    date: {
        type: Date,
        require: true
    }
})
