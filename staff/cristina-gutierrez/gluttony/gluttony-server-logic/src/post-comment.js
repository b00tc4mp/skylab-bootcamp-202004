const { models: { Comments } } = require("gluttony-data")
const { v4: uuidv4 } = require("uuid")

/**
 * @param  {string} id
 * @param  {string} text
 * @param  {Date} creationDate
 * @param  {string} user
 * @param  {string} store
 */
module.exports = (id, text, creationDate, user, store) => {
    id = id || uuidv4()
    String.validate.notVoid(id)
    String.validate.notVoid(text)
    String.validate.notVoid(user)
    String.validate.notVoid(store)

    return (async () => {
        await Comments.create({ id, text, creationDate, user, store })
    })()
}