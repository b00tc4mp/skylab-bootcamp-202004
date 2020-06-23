require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: {Worker }, mongoose: {ObjectId} } = require('takemytask-data')

//TODO key words search

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