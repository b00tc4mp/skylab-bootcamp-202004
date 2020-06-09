const { Schema } = require('mongoose')

module.exports = new Schema({
    name:{
        type: String,
        required: true,
    },
    tags: { type: [String], index: true},
    
    price:{
        type: Number
    }
})