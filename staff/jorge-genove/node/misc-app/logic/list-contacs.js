require('../utils/string')
const fs = require('fs')
require('../utils/function')
const path = require('path')
require('../utils/json')
const findContacts = require('../data/contactsss')

module.exports = (userId, callback) => {debugger
  String.validate.notVoid(userId)
  Function.validate(callback)
  

findContacts({userId}, (error, contacts) => {
  if (error) return callback(error)

  callback(null, contacts)
})
}

