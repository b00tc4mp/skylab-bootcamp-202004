const { Schema, Types: {ObjectId} } = require('mongoose')
const Restaurant = require('./restaurant')
const {Email} = require('plates-commons/utils')


module.exports = new Schema({

    name:{
        type: String
        
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

    password:{
        type: String,
        required: true
    },

    following: {
        type: ObjectId, 
        ref: 'Dish'
    },

    restaurant: {type: ObjectId, ref: 'Restaurant'}
    
})