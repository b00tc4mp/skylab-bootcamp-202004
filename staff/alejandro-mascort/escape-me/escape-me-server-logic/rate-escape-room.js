require('escape-me-commons/polyfills/string')
require('escape-me-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('escape-me-commons')

const { mongoose: { ObjectId }, models: { User, EscapeRoom } } = require('escape-me-data')

module.exports = (userId, escapeId, userRating) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(escapeId)
    Number.validate.positive(userRating)

    return (async () => {
        const user = await User.findOne({ _id: ObjectId(userId) }, { __v: 0, password: 0 }).lean()

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        const escapeRoom = await EscapeRoom.findOne({ _id: escapeId }, { _v: 0 }).lean()

        if (!escapeRoom) throw new UnexistenceError(`escape room with id ${escapeId} does not exist`)

        const _reviews = escapeRoom['reviews']

        const index = _reviews.findIndex(item => item.user.toString() === userId)

        if (index >= 0) _reviews[index]['rating'] = userRating
        else _reviews.push({ user: ObjectId(userId), rating: userRating })

        let sum = 0
        _reviews.forEach(({ rating }) => sum += rating)

        const totalRating = sum / _reviews.length

        await EscapeRoom.findByIdAndUpdate({ _id: escapeId }, { reviews: _reviews, rating: totalRating })
    })()
}