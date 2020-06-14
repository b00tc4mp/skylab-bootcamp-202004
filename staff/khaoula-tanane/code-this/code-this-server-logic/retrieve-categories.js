require('code-this-commons/polyfills/string')
const { models: { Category } } = require('code-this-data')

module.exports = async() => await Category.find({}).exec()

