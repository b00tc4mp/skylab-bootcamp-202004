/**
 * how many work group match the query
 * @param {string} userId Id of user made de petition
 * @param {string} workGroupId Id of workgroup 
 * @param {string} petitionId Id of petition
 * @param {string} status accepted or dennied
 * @throws {TypeError} Throws an error if user dont exists
 * @throws {TypeError} Throws an error if work group not exists
 * @throws {TypeError} Throws an error if petition not exists
 */
require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {mongoose:{ObjectId} ,models:{User,WorkGroup}} = require('work-meeting-data')
const {errors:{DuplicityError, UnexistenceError}} = require('work-meeting-commons')
module.exports=(userId, workGroupId, petitionId, status) =>{ //status value is (accepted/dennied)
    String.validate.notVoid(userId)
    String.validate.notVoid(petitionId)
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(status)
    
    return (async ()=>{
        debugger
        const user = await User.findById(userId)
            if(!user) throw new UnexistenceError(`user with Id: ${userId} dont exist`)
        const workGroup = await WorkGroup.findById(workGroupId)
            if(!workGroup) throw new UnexistenceError(`workGroup with Id: ${workGroupId} dont exist`)
        let {members, petitions} = workGroup
        
        const petition =  petitions.some((petit)=>petit._id==petitionId) // why fukin include no found?
            if(!petition) throw new UnexistenceError(`petition with Id: ${petitionId} not exist`)
                    
      
        if(status==='accepted'){
        
        workGroup.members.push(userId)
        }

        for(let i=0;i<petitions.length;i++){
            
            if(petitions[i]._id==petitionId) { console.log('entra')
                petitions[i].status="accepted";
            }
           
        }
        
        await workGroup.save()
       

       
    })()
}