const Email = require('../utils/email')
require('../utils/string')
require('../utils/function')
const { find } = require('../data/users')



module.exports = (email, password, callback) => {

  Email.validate(email)
  String.validate.notVoid(email)
  String.validate.lengthGreaterEqualThan(password, 8)
  Function.validate(callback)

  find({ email }, (error, [user]) => {

    if (error) return callback(error)

    if (!user) return callback(new Error(`User with e-mail ${email} does not exists`))

    if (user.password !== password) return callback(new Error('wrong credentials'))

    callback(null, user.userId)
  })

}



