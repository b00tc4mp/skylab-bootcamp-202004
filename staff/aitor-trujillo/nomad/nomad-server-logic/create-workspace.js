require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const { errors: { DuplicityError } } = require('nomad-commons')

const { models: { Workspace } } = require('nomad-data')

module.exports = (userId, workspace) => {

    const { name, price, address, geoLocation, photos, phone, features, description, capacity, reviews } = workspace
    const { amount, term } = price
    const { street, city, country } = address
    const { coordinates } = geoLocation
    const [lat, lon] = coordinates
    const [photo] = photos
    const { wifi, parking, coffee, meetingRooms } = features
    String.validate.notVoid(userId)
    String.validate.notVoid(name)
    Number.validate(amount)
    String.validate.notVoid(term)
    String.validate.notVoid(street)
    String.validate.notVoid(city)
    String.validate.notVoid(country)
    if (typeof coffee !== 'boolean') throw new TypeError(`${coffee} is not boolean`)
    Number.validate(lat)
    Number.validate(lon)
    String.validate.notVoid(photo)
    String.validate.notVoid(phone)
    String.validate.notVoid(wifi)
    String.validate.notVoid(parking)
    Number.validate(meetingRooms)
    String.validate.notVoid(description)
    Number.validate(capacity)

    workspace.creator = userId;

    return (async () => {
        const workspaceFound = await Workspace.findOne({ phone })

        if (workspaceFound) throw new DuplicityError(`workspace with phone ${phone} already exists`)

        await Workspace.create(workspace)
            .then(() => { })
    })()
}