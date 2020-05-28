require('../utils/polyfills/string')
const fs = require('fs')
require('../utils/polyfills/function')
const path = require('path')
require('../utils/polyfills/json')
const { contacts :{find} } = require('../data')

module.exports = (userId, callback) => {debugger
  String.validate.notVoid(userId)
  Function.validate(callback)
  

find({userId}, (error, contacts) => {
  if (error) return callback(error)

  callback(null, contacts)
})
}

