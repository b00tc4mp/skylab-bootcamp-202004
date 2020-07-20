const { Schema , Types: {ObjectId}} = require('mongoose')

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true},

    date: {
        type: Date,
        default:'1/1/2992'
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'dennied'],
        default:'pending'
    }
    
    
})