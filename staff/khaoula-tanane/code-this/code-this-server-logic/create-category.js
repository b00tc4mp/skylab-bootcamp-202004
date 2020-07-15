require('code-this-commons/polyfills/string')
const { models: { Category } } = require('code-this-data')
const { errors: { DuplicityError } } = require('code-this-commons')


module.exports = (name, challenges) => {
    String.validate.notVoid(name)
  
    return (async () => {
    try {
        await Category.create({ name, challenges })
    } catch (error) {
        throw new DuplicityError(`category with name ${name} already exists`)
    }

    })()
 
}