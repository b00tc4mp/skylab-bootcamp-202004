const { model } = require('mongoose')
const { user, lesson, lessonQuantity, order } = require('./schemas')

module.exports = {
  User: model('User', user),
  Lesson: model('Lesson', lesson),
  LessonQuantity: model('LessontQuantity', lessonQuantity),
  Order: model('Order', order)
}
