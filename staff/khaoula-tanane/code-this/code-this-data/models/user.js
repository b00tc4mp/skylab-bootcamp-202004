const { Schema, SchemaTypes: {ObjectId} } = require('mongoose')
const mongoose = require('mongoose')
const { utils: { Email } } = require('code-this-commons') 


const User = new Schema({
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate, 'invalid e-mail'] 
    }, 
    password: {
        type: String,
        required: true
    },
    completedChallenges: {
        type: [ObjectId],
        ref: 'challenge'
    }
})

module.exports = mongoose.model('User', User)