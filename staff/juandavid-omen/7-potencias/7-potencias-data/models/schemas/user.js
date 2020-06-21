const { Schema } = require('mongoose')
const { utils: { Email } } = require('7-potencias-commons')
const order = require('./order')
const productSelection = require('./product-selection')

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

  created: {
    type: Date,
    required: true,
    default: Date.now
  },

  role: {
    type: String,
    required: true,
    default: 'regular'
  },

  cart: [productSelection],

  orders: [order]
})
