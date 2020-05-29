require('../utils/polyfills/string')
require('../utils/polyfills/function')
const { find } = require('../data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return new Promise((resolve, reject) => {

        find({ id: userId }, 'users', (error, [user]) => {
            if (error) return reject(error)

            if (!user) return reject(new Error(`user with id ${userId} does not exist`))

            delete user.id
            delete user.password

            resolve(user)
        })
    })
}