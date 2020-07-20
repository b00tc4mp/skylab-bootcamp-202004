const { Schema , Types: {ObjectId}} = require('mongoose')


module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    members:[{
        type: ObjectId,
        ref: 'User'}],
    
    readBy:[{
        type: ObjectId,
        ref: 'User'}]
    
})  