const { Schema } = require('mongoose')
const {Menu} =require ('.')

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
        required:true
    },

    // TODO mapLocation

    menu: Menu
})
