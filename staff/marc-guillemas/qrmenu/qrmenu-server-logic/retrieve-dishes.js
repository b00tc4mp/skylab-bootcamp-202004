const {models: {Establishment}} = require('qrmenu-data')
const {errors: {UnexistenceError, VoidError}} = require('qrmenu-commons')
module.exports = (establishmentId) => {
    
    return (async() => {
        debugger
        const establishment = await Establishment.findById(establishmentId)

        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)

        const {dishes} = establishment
        
        if(!dishes.length) throw new VoidError('Do not have dishes yet')
        
        return dishes
    })()
}