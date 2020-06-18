const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const productSelection = require('./product-selection')

module.exports = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },

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
