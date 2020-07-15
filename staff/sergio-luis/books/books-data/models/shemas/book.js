const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


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

    ownerUserId: {
        type: ObjectId,
        ref:'User',
        required: true
    },

    actualUserId:{
        type: ObjectId,
        ref:'User'
    },

    requested:{
        type: ObjectId,
        ref:'User'
    }
})