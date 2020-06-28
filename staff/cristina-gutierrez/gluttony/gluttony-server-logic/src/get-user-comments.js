const { models: { Comments } } = require("gluttony-data")

/**
 * @param  {string} userId
 * @returns Promise
 */
module.exports = (userId) => {
    String.validate.notVoid(userId)

    return Comments.find({ user: userId }, "text creationDate user store")
        .populate({ path: "store", options: { lean: true } }).lean()
        .then(comments => comments.map(comment => {
            comment.id = comment._id
            comment.store.id = comment.store._id

            delete comment._id
            delete comment.store._id

            return comment
        }))
}