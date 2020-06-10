require('nomad-commons/polyfills/string')

const { models: { Workspace } } = require('nomad-data')

module.exports = async (query) => {

    String.validate.notVoid(query)

    User

    const workspaces = await Workspace.find({
        $or: [
            { 'address.city': { $regex: `.*${query}.*` } },
            { 'address.country': { $regex: `.*${query}.*` } },
            { name: { $regex: `.*${query}.*` } }, { phone: { $regex: `.*${query}.*` } }
        ]
    }).lean();
    // const workspaces = await Workspace.find({ name: { $regex: `.*${query}.*` } }).lean();

    if (!workspaces.length) throw new Error(`no matchings for "${query}"`)

    return workspaces
}
