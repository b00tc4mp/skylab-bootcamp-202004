/**
 * Search workspaces that matches a query, by name, city or country.
 * 
 * @param {string} userId The workspace values. 
 * @param {string} query The query to filter workspaces and retrieve. 
 * 
 * @returns {Promise<String>} Workspace array if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {UnexistenceError} If there is no user matching userId.
 * @throws {Error} If user has no favorite workspaces.
 * @throws {Error} If there is no results for the query.
 */


require('nomad-commons/polyfills/string')

const { models: { User } } = require('nomad-data')

module.exports = async (userId, query) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)

    const userPopulated = await User.findOne({ _id: userId }).populate({ path: 'favorites' })

    if (!userPopulated) throw new UnexistenceError(`user with id ${userId} does not exist`)

    const favWorkspaces = userPopulated.favorites

    if (!favWorkspaces.length) throw new Error("You don't have favorite workspaces :(")

    const result = favWorkspaces.filter(({ address, name }) => {
        return address.city.includes(query) || address.country.includes(query) || name.includes(query)
    })

    if (!result.length) throw new Error("No results for your query :(")

    return result
}