const { Schema } = require('mongoose')


module.exports = new Schema({

    name:{
        type: String,
        required: true
    },
    
    surname:{
        type: String
    },
    
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate, 'invalid email']
    },

    following: [platesId],

    restaurant: restaurantId
    
})