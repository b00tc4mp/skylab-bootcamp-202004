require('moove-it-commons/polyfills/number')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/array')
const { models: { Item } } = require('moove-it-data')

module.exports = (name, position, orientation, width, height) => {
String.validate.notVoid(name)
Array.validate(position)
Number.validate(orientation)
Number.validate(width)
Number.validate(height)

return Item.create({ name, position, orientation, width, height })

}