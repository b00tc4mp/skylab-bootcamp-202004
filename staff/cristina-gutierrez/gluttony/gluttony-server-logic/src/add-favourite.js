const { models: { Users } } = require("gluttony-data")
const { errors: { DuplicityError } } = require("gluttony-commons")

/**
 * @param  {string} storeId
 * @param  {string} userId
 * @returns void
 * @throws DuplicityError
 */
module.exports = (storeId, userId) => {
    String.validate.notVoid(storeId)
    String.validate.notVoid(userId)

    return (async () => {
        const user = await Users.findOne({ _id: userId, favouriteStores: storeId }, "favouriteStores").lean()

        if (user) throw new DuplicityError(`${storeId} already exists`)

        await Users.findByIdAndUpdate(userId, { $push: { favouriteStores: storeId }})
    })()
}