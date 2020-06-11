require('plates-commons/polyfills/string')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/number')
const {utils: {Email }, errors:{DuplicityError, VoidError, UnexsistenceError} } = require('plates-commons')
const {models: { User, Restaurant, Menu, Plate}} = require('plates-data')


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

        if(!user) throw new UnexsistenceError(`user with id ${userid} doesn't exitst`)
        

        const restaurant = await Restaurant.findOne({cif})

        if(restaurant) throw new DuplicityError(`restaurant cif with ${cif} already exist`)

        const newRestaurant = await Restaurant.create({owner:user, name, address, cif, phone, email})

        user.restaurant = newRestaurant

        await user.save()
        
        return
    }) ()


    



}

