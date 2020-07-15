const { mongoose } = require('misc-data')
const { model: {Product} } = require('misc-data')
const {errors: { DuplicityError } } = require('misc-commons')

module.exports = (product) => {

    if(!product instanceof Object ) throw new TypeError(`${product} is not an object`)

    return (async () => {
        const checkProduct = await Product.findOne({name: product.name})
        if (checkProduct) throw new DuplicityError(`Product with name ${name} already exists`)  
        await Product.create( product )
          
    })()
} 