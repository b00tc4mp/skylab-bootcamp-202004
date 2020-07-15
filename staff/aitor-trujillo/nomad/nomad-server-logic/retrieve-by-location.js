/**
 * Retrieves workspaces array sorted by location.
 * 
 * @param {string} userId The workspace values. 
 * @param {object} location Object including latitude & longitude for the position to retrieve. 
 * @param {string} filter Optional parameter for retrieving workspaces that matches category property. 
 * 
 * @returns {Promise<String>} The workspace objects array up to length 20 if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {UnexistenceError} Cannot find user by userId.
 * @throws {Error} If can not find any workspace by location.
 */

require('nomad-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('nomad-commons')
const { models: { User, Workspace } } = require('nomad-data')

module.exports = async (userId, location, filter) => { // location = [lat-lon]
    String.validate.notVoid(userId)

    const user = await User.findOne({ _id: userId })

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    let geoWorkspaces = await Workspace.find({
        geoLocation: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: location,
                },
            },
        },
    })
    if (!geoWorkspaces.length) throw new Error("No workspaces near you")

    if (filter) geoWorkspaces = geoWorkspaces.filter(({ category }) => category === filter)

    return geoWorkspaces.slice(0, 10)
}

