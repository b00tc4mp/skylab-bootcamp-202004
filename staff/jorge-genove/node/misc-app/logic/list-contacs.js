require('../utils/polyfills/string')
const fs = require('fs')
require('../utils/polyfills/function')
const path = require('path')
require('../utils/polyfills/json')
const findContacts = require('../data/contactsss')

module.exports = (userId, callback) => {debugger
  String.validate.notVoid(userId)
  Function.validate(callback)
  

findContacts({userId}, (error, contacts) => {
  if (error) return callback(error)

  callback(null, contacts)
})
}

