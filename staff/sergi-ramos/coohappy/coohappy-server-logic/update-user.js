require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
require('coohappy-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { ObjectId } = mongoose

module.exports = (name, surname, email, password) => {

    String.validate.notVoid



}