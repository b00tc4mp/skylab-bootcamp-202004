const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
  prodcut: {
    type: ObjectId,
    ref: 'Product',
    required: true
  },

  quantity: {
    type: Number,
    require: true
  }

})
