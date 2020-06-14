require('code-this-commons/polyfills/string')
const { models: { Category } } = require('code-this-data')

module.exports = async(name) => await Category.findOne({name}).populate('challenges').exec()

