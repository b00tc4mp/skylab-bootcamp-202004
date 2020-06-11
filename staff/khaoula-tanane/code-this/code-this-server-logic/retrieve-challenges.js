require('code-this-commons/polyfills/string')
const { models: { Challenge } } = require('code-this-data')

module.exports = async() => await Challenge.find({}).exec()

