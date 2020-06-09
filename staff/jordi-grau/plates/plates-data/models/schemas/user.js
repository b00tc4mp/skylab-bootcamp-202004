const { Schema } = require('mongoose')
const Restaurant = require('./restaurant')


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

    following: {
        type: ObjectId, 
        ref: 'Plate'
    },

    restaurant: Restaurant
    
})