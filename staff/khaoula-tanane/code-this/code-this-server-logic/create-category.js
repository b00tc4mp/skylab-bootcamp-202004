require('code-this-commons/polyfills/string')
const { models: { Category } } = require('code-this-data')

module.exports = (name, challenges) => {
    String.validate.notVoid(name)

    console.log(Category)
    console.log(name, challenges)

  
    return (async () => {
    try {
        
        await Category.create({ name, challenges })
    } catch (error) {
        console.log(error)
    }

    })()
 
}