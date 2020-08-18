require('plates-commons/polyfills/string')
const { errors: { UnexistenceError }} = require('plates-commons')
const { models: { Restaurant, Dish }} = require('plates-data')


module.exports = (position)=>{
    debugger
    String.validate.notVoid(position)

    return( async() =>{
        let dishes =  await Dish.find({ position }).lean()

        if(dishes.length === 0) throw new UnexistenceError(`No results with position: ${position}`)
        return dishes
    }) ()
}