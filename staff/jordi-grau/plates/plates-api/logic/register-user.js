require('../utils/polyfills/string')
require('../utils/polyfills/json')
const { Email } = require('../utils')
const { DuplicityError } = require('../errors')
const { mongoose } = require('../data')

module.exports = (name, surname, email, password)
