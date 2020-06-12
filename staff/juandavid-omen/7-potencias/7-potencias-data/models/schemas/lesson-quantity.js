const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
  lesson: {
    type: ObjectId,
    ref: 'Lesson',
    required: true
  },

  quantity: {
    type: Number,
    require: true
  }

})
