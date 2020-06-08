require('cook-wise-commons/polyfills/string')
const { errors: { DuplicityError } } = require('cook-wise-commons')
const { models: { Ingredients } } = require('cook-wise-data')

module.exports = (name) => {
    String.validate.notVoid(name)

    return (async () => {
        const ingredient = await Ingredients.findOne({ name })

        if (ingredient) throw new DuplicityError(`We got that ingredient in the kitchen! ;)`)

        await Ingredients.create({name})
    })()


} 