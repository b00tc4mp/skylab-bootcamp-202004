const { Schema } = require('mongoose')
const { Email, NIF } = require('qrmenu-commons')
const { dish } = require('./dish')

model.exports = new Schema ({
    
    name: {
        type: String,
        required: true
    },

    nif: {
        type: String,
        required: true,
        unique: true,
        validate: [NIF.validate, 'invalid NIF']
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate,'invalid e-mail']
    },

    password: {
        type: String,
        required: true
    },

    dishes: [dish],

    menus: [menu],

    orders: [order],

    roles: {
        type: String,
        enum: ["owner", "chef", "waiter"]
    },

    staff : [user]

})