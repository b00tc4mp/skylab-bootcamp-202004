const { Schema, Types: {ObjectId} } = require('mongoose')

module.exports = new Schema({
    worker:{
        type: ObjectId,
        ref: 'User',
        required: true},
    status:{
        type: String,
        enum:['unread', 'read'],
        default:'unread'
    }
    

})