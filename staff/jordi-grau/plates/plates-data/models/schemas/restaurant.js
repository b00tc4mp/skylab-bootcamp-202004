const { Schema, Types: {ObjectId} } = require('mongoose')
const { Menu } =require ('.')
const { utils: { Email } } = require('plates-commons')

module.exports = new Schema({

    name:{
        type: String,
        required: true,
    },

    address:{
        type: String,
        required: true,
    },
    
    cif:{
        type: String,
        required: true,
        unique: true
    },

    phone:{
        type: Number,
        required: true
    },
    
    email:{
        type: String,
        required:true,
        validate: [Email.validate, 'invalid e-mail']
    },

    // TODO mapLocation

    dishes: [{
        type: ObjectId,
        ref: 'Dish'
    }]
})
