require('7-potencias-commons/polyfills/string')
const { models: { Lesson } } = require('7-potencias-data')

module.exports = query => {

  var criteria = {}

  if (query) {
    criteria = {
      $or: [{ name: new RegExp(query, 'i') }]
    }
  }

  return (async () => {
    let lessons = await Lesson.find(criteria).lean()

    lessons = lessons.map(lesson => {
      lesson.id = lesson._id.toString()
      delete lesson._id
      delete lesson.__v

      return lesson
    })

    return lessons
  })()
}
