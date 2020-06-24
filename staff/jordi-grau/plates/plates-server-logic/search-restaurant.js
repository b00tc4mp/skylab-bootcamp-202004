require('plates-commons/polyfills/string')
require('plates-commons/utils/email')
const {utils: { Email }, errors: { DuplicityError, VoidError, UnexsitenceError } } = require('plates-commons')
const {mongoose, models: {  Restaurant, Dish }} = require('plates-data')
/**
 * Function makes a search with passed query. Returns all restaurants that macth with query.
 * @param {string} query  data required to succes in search function.
 * 
 * @throws UnexistenceError if no match is founded.
 */
module.exports = (query) => {
    
    String.validate.notVoid(query)
    
    return(async () => {
        const dishes = await Dish.find({name: {$regex:query, $options: 'i'}})   

        const dishesIds = dishes.map(dish => dish._id)
    
        const restaurant = await Restaurant.find({
          $or: [
            {name: {$regex: query, $options: 'i'}},
            {email: {$regex:query, $options: 'i'}},
            {cif: {$regex:query, $options: 'i'}},
            {address: {$regex:query, $options: 'i'}},
            {dish: {$in:dishesIds }}
          ]
        })

        if(!restaurant) throw new UnexsitenceError(`no results with ${query} search`)

        return restaurant
         
        
    })()


}