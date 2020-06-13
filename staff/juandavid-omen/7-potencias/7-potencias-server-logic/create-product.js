require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/number')
const { models: { Product } } = require('7-potencias-data')
const { errors: { DuplicityError } } = require('7-potencias-commons')

module.exports = (name, price, danceStyle, hour, minute) => {
  String.validate.notVoid(name)
  Number.validate(price)
  String.validate.notVoid(danceStyle)

  return Product.findOne({ name })
    .then(product => {
      if (product) throw new DuplicityError(`Product with name ${name} already exits`)

      return Product.create({ name, price, danceStyle, hour, minute })
    })
}
