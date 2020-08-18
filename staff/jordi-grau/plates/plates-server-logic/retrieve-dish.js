require('plates-commons/polyfills/string')
const { mongoose, models: {Restaurant, Dish} } = require('plates-data')
const { UnexistenceError } = require('plates-commons/errors')

module.exports = dishId => {
    String.validate.notVoid(dishId)
    
    return ( Dish.findById(dishId )
        .then( dish =>{
            if(!dish) throw new UnexistenceError(`Dish with ${dishId} does not exist`)

            dishId = dish._id.toString()

            delete dish._id

            return dish
        })   
    )
}




