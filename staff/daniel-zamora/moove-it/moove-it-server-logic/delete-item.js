require('moove-it-commons/polyfills/number')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/array')
const { models: { Blueprint, User, Item } } = require('moove-it-data')
const { errors: { UnexistenceError } } = require('moove-it-commons')

module.exports = (itemId, userId, blueprintId) => {

    if (itemId !== undefined) String.validate.notVoid(itemId)
    String.validate.notVoid(userId)
    String.validate.notVoid(blueprintId)

    return (async() => {
        debugger

        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        const blueprint = await Blueprint.findById(blueprintId)
        if (!blueprint) throw new UnexistenceError(`blueprint with id ${blueprintId} does not exist`)

        const index = blueprint.items.findIndex(item => item.id === itemId)

        const itemName = blueprint.items[index].name

        if (index === -1) throw new UnexistenceError(`item with id ${itemId} does not exist`)

        blueprint.items.splice(index, 1)
        await blueprint.save()

        return itemName

    })()
}