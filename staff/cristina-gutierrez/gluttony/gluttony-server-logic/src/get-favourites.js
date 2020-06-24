const { models: { Users } } = require("gluttony-data")
/**
 * @param  {string} userId
 */
module.exports = (userId) => {
    String.validate.notVoid(userId)

    return Users.findById(userId, "favouriteStores")
        .populate({ path: 'favouriteStores', options: { lean: true } }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            return user.favouriteStores.map(store => {
                store.id = store._id
                
                return store
            })
        })
}