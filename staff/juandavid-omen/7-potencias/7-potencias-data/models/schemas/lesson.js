const { Schema } = require('mongoose')

module.exports = new Schema({
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  style: {
    type: String,
    required: true
  },

  hour: {
    type: Number,
    required: true
  },

  minute: {
    type: Number,
    required: true
  },

  day: Number,

  month: Number,

  year: Number
})
