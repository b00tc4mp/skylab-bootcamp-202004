require('plates-commons/polyfills/string')
require('plates-commons/utils/email')
const {utils: { Email }, errors: { DuplicityError, VoidError, UnexsitenceError } } = require('plates-commons')
const {mongoose, models: {  Restaurant, Dish }} = require('plates-data')

/**
 * function makes a search on passed query. Return matched results.
 * @param {string} query data required to make a search. 
 */

module.exports = (query) => {
    String.validate.notVoid(query)

    return ( async () =>{
        let dishes = await Dish.find({
          $or:[
            {name: {$regex: query, $options: 'i'}},
            {tags: {$regex: query, $options: 'i'}}
          ]
          }).lean()
        
        for (let i = 0; i < dishes.length; i++) {
          const restaurant = await Restaurant.find({ dishes: dishes[i]._id }).lean();
          dishes[i].restaurant = restaurant;
        }
        // dishes.forEach( dish => dish._id)
       

        // const restaurant = await Restaurant.find({
        //     $or: [
        //       {name: {$regex: query, $options: 'i'}},
        //       {email: {$regex:query, $options: 'i'}},
        //       {cif: {$regex:query, $options: 'i'}},
        //       {address: {$regex:query, $options: 'i'}},
        //       {dishes: {$in:dishesIds }}
        //     ]
        //   })

        // if(!dish) throw new UnexsitenceError(`no results with ${query} search`)

        return dishes
    }) ()
}