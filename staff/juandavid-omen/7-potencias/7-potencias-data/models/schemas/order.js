const { Schema } = require('mongoose')
const lessonQuantity = require('./lesson-quantity')

module.exports = new Schema({
  lessons: {
    type: [lessonQuantity],
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
