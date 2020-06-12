require('moove-it-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('moove-it-commons')
const { mongoose: { ObjectId }, models: { Blueprint, User } } = require('moove-it-data')

module.exports = (userId, blueprintId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(blueprintId)

    return (async() => {

        const user = await User.findOne(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        const blueprint = await Blueprint.findOne({ _id: ObjectId(blueprintId) }, { __v: 0 }).lean()

        if (!blueprint) throw new UnexistenceError(`blueprint with id ${blueprintId} does not exist`)

        blueprint.id = blueprint._id.toString()

        delete blueprint._id

        return blueprint

    })()
}