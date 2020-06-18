const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
  product: {
    type: ObjectId,
    required: true,
    ref: 'Product'
  },

  isOnline: {
    type: Boolean,
    required: true,
    default: false
  },

  isGroup: {
    type: Boolean,
    required: true,
    default: false
  }
})
