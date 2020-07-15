const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const mongoose = require('mongoose')

const Category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    challenges: [{type: ObjectId, ref: 'Challenge'}]
    
})
module.exports = mongoose.model('Category', Category)


