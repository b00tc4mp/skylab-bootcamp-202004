const { models: { Users } } = require("gluttony-data")

/**
 * @param  {string} userId
 * @returns Promise
 */
module.exports = (userId) => {
    String.validate.notVoid(userId)

    return Users.findById(userId, "favouriteStores")
        .populate({ path: 'favouriteStores', options: { lean: true } }).lean()
        .then(user => user.favouriteStores.map(store => {
            store.id = store._id
            return store
        }))
}