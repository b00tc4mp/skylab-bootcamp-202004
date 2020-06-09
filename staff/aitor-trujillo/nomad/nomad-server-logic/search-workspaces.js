require('nomad-commons/polyfills/string')

const { models: { Workspace } } = require('nomad-data')

module.exports = async (query) => {

    String.validate.notVoid(query)

    const workspaces = await Workspace.find({ $or: [{ address: { city: { $regex: `.*${query}.*` } } }, /*{ country: { $regex: `.*${query}.*` } },*/ { name: { $regex: `.*${query}.*` } }] }).lean();
    // const workspaces = await Workspace.find({ name: { $regex: `.*${query}.*` } }).lean();

    if (!workspaces.length) throw new Error(`no matchings for "${query}"`)

    return workspaces
}
