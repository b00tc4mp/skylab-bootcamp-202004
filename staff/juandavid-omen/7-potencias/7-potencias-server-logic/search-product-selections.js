const { models: { ProductSelection } } = require('7-potencias-data')
require('7-potencias-commons/polyfills/boolean')

module.exports = (isOnline, isGroup) => {
  const query = []

  if (Boolean.isBoolean(isOnline)) query.push({ isOnline: isOnline })

  if (Boolean.isBoolean(isGroup)) query.push({ isGroup: isGroup })

  return (async () => {
    let searchParameters = {}

    if (query.length > 0) {
      searchParameters = {
        $and: query
      }
    }

    let productSelections = await ProductSelection.find(searchParameters).lean()

    productSelections = productSelections.map(lesson => {
      lesson.id = lesson._id.toString()
      delete lesson._id
      delete lesson.__v

      return lesson
    })

    return productSelections
  })()
}
