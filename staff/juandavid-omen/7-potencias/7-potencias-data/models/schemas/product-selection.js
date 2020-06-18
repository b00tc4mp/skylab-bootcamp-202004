const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
  product: {
    type: ObjectId,
    required: true,
    ref: 'Lesson'
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
