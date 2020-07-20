/**
 * how many work group match the query
 * @param {string} query word that we are going to search
 * @throws {TypeError} Throws an error if there is no answer for your searchs
 */
require('work-meeting-commons/polyfills/string')
const {mongoose:{ObjectId}, models: {WorkGroup}}= require('work-meeting-data')
const { UnexistenceError } = require('work-meeting-commons/errors')
module.exports= query =>{
    String.validate.notVoid(query)
    return (async()=>{
        const workGroup = await WorkGroup.find({name:{$regex:query, $options:'i'}}).lean()
        
        if(workGroup.length==0) throw new UnexistenceError("there is no answer for your search")
        return workGroup
    })()
}