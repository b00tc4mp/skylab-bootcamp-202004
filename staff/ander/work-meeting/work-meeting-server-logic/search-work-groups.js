/**
 * how many work group match the query
 * @param {string} query word that we are going to search
 * @throws {TypeError} Throws an error if there is no answer for your searchs
 */
require('work-meeting-commons/polyfills/string')
const { models: {User,WorkGroup}}= require('work-meeting-data')
const { errors:{UnexistenceError}, utils:{sanitize} } = require('work-meeting-commons')
module.exports= (userId, query)=>{
    String.validate.notVoid(userId)
    String.validate.notVoid(query)
    return (async()=>{
        const user = await User.findById(userId)
        if(!user) throw new UnexistenceError(`user with Id ${userId} not exist`)
        const workGroup = await WorkGroup.find({name:{$regex:query, $options:'i'}}).lean()
      
        if(workGroup.length==0) throw new UnexistenceError("there is no answer for your search")
        const listWorkGroup = workGroup.filter((element)=> element.creator.toString()!==userId)
        sanitize(listWorkGroup);
        
        return listWorkGroup

    })()
}