const { Schema } = require('mongoose')


module.exports = new Schema({
    restaurantId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    position:{
        type: String
    },
    tags: { type: [String], index: true},
    
    price:{
        type: Number
    },

    followers: {
        type: [String], 
        index: true
    },

    available: {
        type: Boolean,
        default: true
    }
})