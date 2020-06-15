require('moove-it-commons/polyfills/number')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/array')
const { models: { Item, Blueprint, User } } = require('moove-it-data')
const { UnexistenceError } = require('moove-it-commons')

module.exports = (itemId, userId, blueprintId, name, x, y, z, orientation, width, height) => {

    if (itemId !== undefined) String.validate.notVoid(itemId)
    String.validate.notVoid(userId)
    String.validate.notVoid(blueprintId)
    String.validate.notVoid(name)
    Number.validate(x)
    Number.validate(y)
    Number.validate(z)
    Number.validate(orientation)
    Number.validate(width)
    Number.validate(height)

    return (async() => {

        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        const blueprint = await Blueprint.findById(blueprintId)

        const newItem = new Item({ name, x, y, z, orientation, width, height })

        const index = blueprint.items.findIndex(item => item.id === itemId)

        if (index !== -1) {
            blueprint.items.splice(index, 1, newItem)
            await blueprint.save()

            return
        }

        blueprint.items.push(newItem)

        await blueprint.save()

        return
    })()


}