const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
  product: {
    type: ObjectId,
    required: true,
    ref: 'Lesson'
  },

  isOnline: {
    type: Boolean,
    required: false,
    default: false
  },

  isGroup: {
    type: Boolean,
    required: false,
    default: false
  },

  quantity: {
    type: Number,
    require: true
  }
})
