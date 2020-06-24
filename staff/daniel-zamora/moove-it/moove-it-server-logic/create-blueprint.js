require('moove-it-commons/polyfills/number')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/array')
const { models: { Blueprint, User } } = require('moove-it-data')
const { errors: { UnexistenceError } } = require('moove-it-commons')

module.exports = (userId, name, width, height) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(name)
    Number.validate(width)
    Number.validate(height)

    return (async() => {
        let user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        
        const blueprint = await Blueprint.create({ user, name, width, height })

        await User.findByIdAndUpdate(userId, { $addToSet: { blueprints: blueprint } })

        return blueprint.id

    })()
}