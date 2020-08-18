require('plates-commons/polyfills/number')
const { errors: { UnexistenceError }} = require('plates-commons')
const { models: { Dish }} = require('plates-data')

module.exports = (min, max)=>{
    
    if(!min) min = 0
    if(!max) max = 10000
    Number.validate(min)
    Number.validate(max)
    Number.validate.positive(min)
    Number.validate.positive(max)
    Number.validate.greaterEqualThan(min, 1)
    Number.validate.greaterEqualThan(max, min)

    return( async() =>{   
        let dishes =  await Dish.find({ $and: [ {price: { $gte: min }}, { price: { $lte: max }}]}).lean()

        if(dishes.length === 0 ) throw new UnexistenceError(`No results between: ${min} and: ${max}`)
        return dishes
    }) ()
}
