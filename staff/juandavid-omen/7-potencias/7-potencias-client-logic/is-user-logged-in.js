/**
* Returns the user's token when it exists.
*
* @returns { boolean } true if it exists, otherwise false.
*/

const context = require('./context')

module.exports = function () {
  const { token } = this.storage

  return !!token
}.bind(context)
