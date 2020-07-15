require('misc-commons/polyfills/string')
require('misc-commons/polyfills/number')
require('misc-commons/polyfills/URL')
const { mongo } = require('misc-data')
const {model :{Product}}  = require('misc-data')
const { errors : {DuplicityError}} = require('misc-commons')

module.exports = (name, description, price, url) => {
    String.validate.notVoid(name)
    String.validate.notVoid(description)
    Number.validate(price)
    URL.validate(url)

    return Product.findOne({ name })
        .then(product => {
            if (product) throw  new DuplicityError(`Product with name ${name} already exist`)

            return Product.create({ name, description, price, url })
        })
}