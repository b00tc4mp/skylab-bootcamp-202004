require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/number')
const { errors: UnexistenceError } = require('7-potencias-commons')
const { models: { User } } = require('7-potencias-data')
module.exports = (userId) => {
  String.validate.notVoid(userId)

      return (async () => {
        const user = await User.findById(userId)
    
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
 
        const cart = []

        return user.save({ userId, $set: {cart} } )
      })()
}
