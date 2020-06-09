const { Schema } = require('mongoose')
const { utils: { Email } } = require('cook-wise-commons')
const recipes = require('./recipes')
const { SchemaTypes: { ObjectId } } = require('mongoose')



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

    favoriterecipes: [{
            type: ObjectId,
            ref: 'Recipes'
        }]
    // menus: [{
    //     type: {
    //         name: {
    //         type: String,
    //         required: true
    //     }
    // }}]
})