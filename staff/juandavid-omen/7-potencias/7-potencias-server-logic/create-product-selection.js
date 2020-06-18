require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/number')
const { models: { ProductSelection, Lesson} } = require('7-potencias-data')
const { errors: { DuplicityError, UnexistenceError } } = require('7-potencias-commons')

module.exports = (product, isOnline, isGroup) => {
  String.validate.notVoid(product)
  if (typeof isOnline !== 'boolean') throw new TypeError('isOnline is not a boolean')
  if (typeof isGroup !== 'boolean') throw new TypeError('isGroup is not a boolean')

  return (async () => {
    const lesson = await Lesson.findById(product).lean()
    if (!lesson) throw new UnexistenceError(`lesson with id ${product} does not exist`)

    const productSelection = await ProductSelection.findOne({
      $and: [{ product: product }, { isGroup: isGroup }, { isOnline: isOnline }]
    }).lean()

    if (productSelection) {
      throw new DuplicityError(`Product selection with id:${product} and isOnline:${isOnline} and is onGroup:${isGroup} already exits`)
    }

    return ProductSelection.create({ product, isOnline, isGroup })
  })()
}
