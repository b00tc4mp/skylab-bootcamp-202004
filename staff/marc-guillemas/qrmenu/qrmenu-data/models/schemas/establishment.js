const { Schema } = require('mongoose')
const { utils: { NIF } } = require('qrmenu-commons')
const dish = require('./dish')
const order = require('./order')
const staff = require('./staff')
const table = require('./table')

module.exports = new Schema ({
    
    establishment: {
        type: String,
        required: true
    },

    nif: {
        type: String,
        required: true,
        unique: true,
        validate: [NIF.validate, 'invalid NIF']
    },

    dishes: [dish],

    // menus: [menu],

    orders: [order],


    tables: [table],


    staff: [staff]

})