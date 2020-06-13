const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    guarantee: {
        type: Number
    },

    profitAndLoss: {
        type: Number
    }

})