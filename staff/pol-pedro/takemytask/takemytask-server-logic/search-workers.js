require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: {Worker }, mongoose: {ObjectId} } = require('takemytask-data')

/**
 * search worker by a string and return all the mathches
 *
 * @param {boolean} userName if search by username
 * @param {boolean} jobCategory if search by category
 * @param {string} words word to search entered by the user
 * 
 * @returns {object}
 *
 */



module.exports = (userName, jobCategory, words) => {
    
    String.validate.notVoid(words)

    return (async () => {
        let search 
        let founds = []

        if(userName){
            search = await Worker.find( { "name": {"$regex": `${words}`, "$options": i, } } , {password: 0} )
            for (var i = 0 in search){
                founds.push({
                    id: search[i].id,
                    name: search[i].name,
                    surname: search[i].surname,
                    presentation: search[i].presentation,
                    pricingHour: search[i].pricingHour,
                    workingDistance: search[i].workingDistance
                })
            }
        }

        if(jobCategory){
            search = await Worker.find( { jobCategories : {"$regex": `${words}`, "$options": i, } }, {password: 0} )
            
            for ( var i = 0 in search){
                if(founds.map(elem => {return elem.id}).indexOf(search[i].id) === -1){
                    founds.push({
                        id: search[i].id,
                        name: search[i].name,
                        surname: search[i].surname,
                        presentation: search[i].presentation,
                        pricingHour: search[i].pricingHour,
                        workingDistance: search[i].workingDistance
                    })
                }
            }
        } 



        return founds

    })()
}