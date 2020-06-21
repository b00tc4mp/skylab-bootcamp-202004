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