const { Schema, Types: {ObjectId} } = require('mongoose')
const summary = require('./summary')

module.exports = new Schema({
    host: {
            type: ObjectId,
            ref: 'User',
            required: true
        
    },
    title: {
        type: String,
        required: true
    },

    content:{
        type:String,
        required: true
    },
    date: {
        type: Date,
        default:'1/1/2992'
    },

    summaries:[summary]

    

})