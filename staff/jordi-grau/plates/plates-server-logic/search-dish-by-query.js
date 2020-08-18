require('plates-commons/polyfills/string')
const { errors: { UnexistenceError }} = require('plates-commons')
const { models: { Dish }} = require('plates-data')

module.exports = (query)=>{
    String.validate.notVoid(query)

    return( async() =>{
        let dishes =  await Dish.find({
            $or:[
                {name: {$regex: query, $options: 'i'}},
                {tags: {$regex: query, $options: 'i'}}
            ]
        }).lean()

        // for(let i = 0; i < dishes.length; i++){
        //     const restaurant = await Restaurant.findById({ dishes: dishes[i]._id}).lean()
        //     dishes[i].restaurant = restaurant
        // }

        if(!dishes) throw new UnexistenceError(`No results with ${query} search`)
        debugger
        return dishes
    }) ()
}