require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/number')
const { models: { Product } } = require('7-potencias-data')
const { errors: { DuplicityError } } = require('7-potencias-commons')

module.exports = (name, price, danceStyle) => {
  String.validate.notVoid(name)
  Number.validate(price)
  String.validate.notVoid(danceStyle)

  return Product.findOne({ name })
    .then(Product => {
      if (Product) throw new DuplicityError(`Product with name ${name} already exits`)

      return Product.insertOne({ name, price, danceStyle })
    })
}
