require('code-this-commons/polyfills/string')
const { models: { Category } } = require('code-this-data')

module.exports = async(name) => {
    const category = await Category.findOne({name}).populate('challenges').exec()
    if (category){
        return category
    } else {
        throw new Error(`category with name ${name} does not exist`)
    }
}

