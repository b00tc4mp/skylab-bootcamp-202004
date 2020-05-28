require('../utils/polyfills/string')

const { users: { find } } = require('../data')
const {UnexistenceError} = require('../errors');

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return new Promise((resolve,reject)=>{
        find({ id: userId }, (error, users) => {
            const [user] = users
            if (error) return reject(error)

            if (!user) return reject(new UnexistenceError(`user with id ${userId} does not exist`))

            delete user.id
            delete user.password

            resolve(user)
        })
    })
}