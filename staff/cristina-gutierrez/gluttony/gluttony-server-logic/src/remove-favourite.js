const { models: { Users } } = require("gluttony-data")
const { errors: { DuplicityError } } = require("gluttony-commons")

/**
 * @param  {string} storeId
 * @param  {string} userId
 * @returns void
 */
module.exports = (storeId, userId) => {
    String.validate.notVoid(storeId)
    String.validate.notVoid(userId)

    return (async () => {
        await Users.findByIdAndUpdate(userId, { $pull: { favouriteStores: storeId }})
    })()
}