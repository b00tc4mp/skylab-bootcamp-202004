require('moove-it-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('moove-it-commons')
const { mongoose: { ObjectId }, models: { Blueprint, User } } = require('moove-it-data')

module.exports = (userId, blueprintId) => {
    debugger
    String.validate.notVoid(userId)
    String.validate.notVoid(blueprintId)

    return (async() => {

        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        const blueprint = await Blueprint.findById(blueprintId).lean()

        if (!blueprint) throw new UnexistenceError(`blueprint with id ${blueprintId} does not exist`)

        blueprint.id = blueprint._id.toString()
            //TODO user un populate para traer todos los items

        delete blueprint._id

        return blueprint

    })()
}