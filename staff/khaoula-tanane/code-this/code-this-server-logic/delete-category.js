require('code-this-commons/polyfills/string')
const{models: {Category}, mongoose: {ObjectId}} = require('code-this-data')

module.exports = (categoryId) => {
    String.validate.notVoid(categoryId)

    

        return Category.deleteOne({_id: ObjectId(categoryId)})

        .then(()=> {return 'category deleted'})

}