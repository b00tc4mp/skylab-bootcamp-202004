const { Schema } = require('mongoose')
const { utils: { Email } } = require('cook-wise-commons')
const recipes = require('./recipes')



module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate, 'invalid e-mail']
    },

    password: {
        type: String,
        required: true
    },

    recipes: [recipes],

    // menus: [{
    //     type: {
    //         name: {
    //         type: String,
    //         required: true
    //     }
    // }}]
})