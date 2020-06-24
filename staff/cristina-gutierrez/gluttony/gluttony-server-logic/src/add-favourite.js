const { models: { Users } } = require("gluttony-data")
const { errors: { DuplicityError } } = require("gluttony-commons")
/**
 * @param  {string} storeId
 * @param  {string} userId
 */
module.exports = (storeId, userId) => {
    String.validate.notVoid(storeId)
    String.validate.notVoid(userId)

    Users.findOne({ id: userId, favouriteStores: storeId })
        .then(user => {
            if (user) {
                throw new DuplicityError(`${storeId} already exists`)
            }
        })

    return Users.findByIdAndUpdate(userId, {$push: { favouriteStores: storeId }})
}