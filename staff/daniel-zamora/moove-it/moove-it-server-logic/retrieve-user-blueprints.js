require('moove-it-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('moove-it-commons')
const { models: { User } } = require('moove-it-data')

module.exports = (userId) => {
    debugger
    String.validate.notVoid(userId)

    return (async() => { debugger

        const user = await User.findById(userId).populate('blueprints','id name width height date').lean()
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)


        const blueprints = user.blueprints.map(blueprint=> {
            blueprint.id = blueprint._id.toString()

            delete blueprint._id
            return blueprint
        })
 


        
        return blueprints
        

    })()
}