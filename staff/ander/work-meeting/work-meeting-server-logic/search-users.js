/**
 * how many users match the query
 * @param {string} query word that we are going to search
 * @throws {TypeError} Throws an error if user not exist
 */
require('work-meeting-commons/polyfills/string')
const { models: {WorkGroup}}= require('work-meeting-data')
const { errors: {UnexistenceError}, utils:{sanitize}} = require('work-meeting-commons')

module.exports= (workGroupId, query ) =>{
    String.validate.notVoid(query)
    String.validate.notVoid(workGroupId)

    return(async()=>{

        const workGroup = await WorkGroup.findById(workGroupId).lean().populate('members')
        if(!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)

        const {members} = workGroup
            const _members = members.filter(member=>{
                const {name, surname, email} = member
                return name.toLowerCase().includes(query) || surname.toLowerCase().includes(query) || email.toLowerCase().includes(query)})
                
                if(!_members) throw new UnexistenceError(`search with query ${query} has not result`)

                sanitize(_members)
                return _members
    })()
      
}
              

       

 
