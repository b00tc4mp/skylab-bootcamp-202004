const { Schema , Types: {ObjectId}} = require('mongoose')


module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    members:[{
            type: ObjectId,
            ref: 'User',
                }],
    workGroup:{
            type: ObjectId,
            ref: 'WorkGroup',
            required: true
                }
    
})