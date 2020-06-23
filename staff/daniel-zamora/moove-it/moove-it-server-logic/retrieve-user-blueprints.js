require('moove-it-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('moove-it-commons')
const { models: { User } } = require('moove-it-data')

module.exports = (userId) => {
    debugger
    String.validate.notVoid(userId)

    return (async() => { debugger

        const user = await User.findById(userId).populate('blueprints').lean()
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)


        user.id = user._id.toString()
        // user.blueprints.id = user.blueprints._id.toString()

        delete user._id
 


        
        return user.blueprints
        

    })()
}