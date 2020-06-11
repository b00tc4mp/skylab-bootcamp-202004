require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
const { errors: { UnexistenceError, DuplicityError} } = require('coohappy-commons')
const { models: { Cohousing } } = require('coohappy-data')
const { mongoose: { ObjectId } } = require('coohappy-data')

module.exports = (userId) => {

    String.validate.notVoid(userId)
  
    return (async () => {

        const cohousing = await Cohousing.findOne({ 'members': ObjectId(userId) })
        if (!cohousing) throw new UnexistenceError(`There is no cohousing with a user with an id ${userId}`)

        if (cohousing.laundry.some(({user:_user}) => _user.toString() === userId)) { 
            await Cohousing.findOneAndUpdate({ 'members': userId }, { $pull: { laundry: { user: userId } } })
     
        }else{
            throw new DuplicityError(`User with id ${userId} has not an hour in the laundry yet`)
        }

    })()
}