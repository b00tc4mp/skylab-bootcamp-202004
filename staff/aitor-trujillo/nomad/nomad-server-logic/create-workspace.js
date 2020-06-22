require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const { errors: { DuplicityError } } = require('nomad-commons')

const { models: { Workspace, User } } = require('nomad-data')

module.exports = (userId, workspace) => {
    const { name, price, category, address, geoLocation, photos, phone, features, description, capacity } = workspace
    const { amount, term } = price
    const { street, city, country } = address
    const { coordinates } = geoLocation
    const [lat, lon] = coordinates
    if (photos) {
        const [photo] = photos
        String.validate.notVoid(photo)
    }
    if (features) {
        const { wifi, parking, coffee, meetingRooms } = features
        if (typeof wifi !== 'boolean') throw new TypeError(`${wifi} is not boolean`)
        if (typeof parking !== 'boolean') throw new TypeError(`${parking} is not boolean`)
        if (typeof coffee !== 'boolean') throw new TypeError(`${coffee} is not boolean`)
        if (typeof meetingRooms !== 'boolean') throw new TypeError(`${meetingRooms} is not boolean`)
    }
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