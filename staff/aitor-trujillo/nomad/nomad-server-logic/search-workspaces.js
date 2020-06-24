/**
 * Search workspaces that matches a query, by name, city or country.
 * 
 * @param {string} query The query to filter workspaces and retrieve. 
 * 
 * @returns {Promise<String>} Workspace array if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If there is no results for the query.
 */

require('nomad-commons/polyfills/string')

const { models: { Workspace } } = require('nomad-data')

module.exports = async (query) => {
    String.validate.notVoid(query)

    const workspaces = await Workspace.find({
        $or: [
            { 'address.city': { $regex: `.*${query}.*` } },
            { 'address.country': { $regex: `.*${query}.*` } },
            { name: { $regex: `.*${query}.*` } }
        ]
    }).lean();

    if (!workspaces.length) throw new Error(`no matchings for "${query}"`)

    return workspaces
}

