/**
 * Creates new workspace.
 * 
 * @param {string} userId The workspace values. 
 * @param {object} workspace The workspace values. 
 * 
 * @returns {Promise<String>} The workspace object created if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {DuplicityError} If phone is already registered for other workspace.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const { errors: { DuplicityError } } = require('nomad-commons')

const { models: { Workspace, User } } = require('nomad-data')

module.exports = (userId, workspace) => {
    const { name, price, category, address, geoLocation, phone, description, capacity } = workspace
    const { amount, term } = price
    const { street, city, country } = address
    const { coordinates } = geoLocation
    const [lat, lon] = coordinates

    String.validate.notVoid(phone)
    String.validate.notVoid(userId)
    String.validate.notVoid(name)
    String.validate.notVoid(category)
    Number.validate(amount)
    String.validate.notVoid(term)
    String.validate.notVoid(street)
    String.validate.notVoid(city)
    String.validate.notVoid(country)
    Number.validate(lat)
    Number.validate(lon)
    String.validate.notVoid(description)
    Number.validate(capacity)

    workspace.creator = userId;

    return (async () => {
        const workspaceFound = await Workspace.findOne({ phone })

        if (workspaceFound) throw new DuplicityError(`workspace with phone ${phone} already exists`)

        return await Workspace.create(workspace)
            .then(async (ws) => {
                const user = await User.findById(userId)

                user.userWorkspaces.push(ws.id)

                await user.save()

                return ws
            })
    })()
}