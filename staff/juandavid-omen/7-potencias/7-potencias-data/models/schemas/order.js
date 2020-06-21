const { Schema } = require('mongoose')
const productSelection = require('./product-selection')

module.exports = new Schema({
  productSelections: {
    type: [productSelection],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    required: true
  }
})
