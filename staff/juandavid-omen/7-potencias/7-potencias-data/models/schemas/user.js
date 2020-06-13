const { Schema } = require('mongoose')
const { utils: { Email } } = require('7-potencias-commons')
const order = require('./order')
const productQuantity = require('./product-quantity')

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
    validate: [Email.validate, 'invalid email']
  },

  password: {
    type: String,
    required: true
  },

  create: {
    type: Date,
    required: true,
    default: Date.now
  },

  role: {
    type: String,
    required: true
    // validate: [Role.validate, 'invalid role']
  },

  cart: [productQuantity],

  orders: [order]
})
