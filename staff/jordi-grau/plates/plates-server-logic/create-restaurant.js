require('plates-commons/polyfills/string')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/number')
const {utils: {Email }, errors:{DuplicityError, VoidError, UnexsistenceError} } = require('plates-commons')
const {models: { User, Restaurant}} = require('plates-data')

/**
 * function sends data needed to create a restaurant.
 * @param {string} userId required to create a restaurant.
 * @param {string} name data info to create restaurant.
 * @param {string} email data info to create restaurant.
 * @param {string} cif data info to create restaurant, required and unique.
 * @param {string} address data info to create restaurant.
 * @param {string} phone data info to create restaurant.
 * 
 * @throws{UnexistenceError} when user is not registered.
 * @throws{DuplicityError} when cif matches with other.
 */
module.exports = (userId, name, email,cif, address, phone)=>{
    String.validate.notVoid(userId)
    String.validate.notVoid(name)
    String.validate.notVoid(address)
    String.validate.notVoid(cif)
    Number.isNumber(phone)
    String.validate.notVoid(email)
    Email.validate(email)

    return (async()=>{
        const user = await User.findById(userId)

        if(!user) throw new UnexsistenceError(`user with id ${userid} doesn't exist`)
        

        const restaurant = await Restaurant.findOne({cif})

        if(restaurant) throw new DuplicityError(`restaurant cif with ${cif} already exists`)

        const newRestaurant = await Restaurant.create({owner:user, name, address, cif, phone, email})

        user.restaurant = newRestaurant

        await user.save()
        
        return 
    }) ()


}

