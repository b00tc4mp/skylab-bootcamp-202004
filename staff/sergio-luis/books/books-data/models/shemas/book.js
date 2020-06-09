const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const message = require('./message')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
    },

    description: {
        type: String,
    },

    barCode :{
        type: String,
        required:true
    },
    

    travelKm:{
        type:Number,
        required: true
    },

    ownerId: {
        type: ObjectId,
        ref:'User',
        required: true
    },

    actualUserId:{
        type: ObjectId,
        ref:'User',
    },

    requested:{
        type:Boolean
    }
})