const { model } = require('mongoose')
const { user, lesson, productSelection, order } = require('./schemas')

module.exports = {
  User: model('User', user),
  Lesson: model('Lesson', lesson),
  ProductSelection: model('ProductSelection', productSelection),
  Order: model('Order', order)
}
