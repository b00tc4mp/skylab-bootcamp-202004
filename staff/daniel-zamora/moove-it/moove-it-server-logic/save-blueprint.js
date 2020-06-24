require('moove-it-commons/polyfills/number')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/array')
const { models: { Blueprint, User } } = require('moove-it-data')
const { errors: { UnexistenceError } } = require('moove-it-commons')

module.exports = (userId, blueprintId, items) => {

    String.validate.notVoid(userId)
    items= new Array(items)
    console.log(typeof items)
    Array.validate(items)
    // return items

    return (async() => {
        let user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        if (blueprintId !== undefined) {

            String.validate.notVoid(blueprintId)
            const blueprint = await Blueprint.findById(blueprintId)
    
            if (blueprint) {
                await Blueprint.findByIdAndUpdate(blueprintId, { $set: { items } })
                await User.findByIdAndUpdate(userId, { $addToSet: { blueprints: blueprint } })

                return blueprint.id
            }
        }

        const blueprint = await Blueprint.create({ items })

        await User.findByIdAndUpdate(userId, { $addToSet: { blueprints: blueprint } })

        return blueprint.id

    })()
}