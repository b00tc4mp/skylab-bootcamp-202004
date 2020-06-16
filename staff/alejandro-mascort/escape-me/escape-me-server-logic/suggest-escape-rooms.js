require('escape-me-commons/polyfills/string')
require('escape-me-commons/polyfills/number')
require('escape-me-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('escape-me-commons')
const { models: { User, EscapeRoom }, mongoose: { ObjectId } } = require('escape-me-data')

module.exports = (userId) => {
    if (userId) String.validate.notVoid(userId)

    return (async () => {
        let sorteable = []
        let index = 0
        const escapesSuggested = []

        if (userId) {
            const genres = {}

            const user = await User.findOne({ _id: ObjectId(userId) }, {
                __v: 0, password: 0, following: 0, name: 0,
                surname: 0, email: 0, username: 0, _id: 0, pending: 0
            }).populate('participated').populate('pending').populate('favorites').lean()

            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            Object.keys(user).forEach(item => {
                user[item].forEach(({ genre }) => {
                    if (genres[genre]) genres[genre] = genres[genre] + 1
                    else genres[genre] = 1
                })
            })

            Object.keys(genres).forEach(genre => {
                sorteable.push([genre, genres[genre]])
            })

            sorteable.sort((a, b) => b[1] - a[1])

            if (sorteable.lenght > 3) sorteable = sorteable.slice(0, 3)

            let escapeRooms
            while (index != sorteable.length) {
                escapeRooms = await EscapeRoom.find({ genre: sorteable[index][0] }).lean()

                if (escapeRooms) escapeRooms.forEach(escape => escapesSuggested.push(escape))

                index++
            }
        }

        if (escapesSuggested.length === 0) {
            escapeRooms = await EscapeRoom.find({}).lean()

            while (escapesSuggested.length < 10) {
                if (escapeRooms) escapeRooms.forEach(escape => escapesSuggested.push(escape))
            }

        }

        return escapesSuggested
    })()
}
