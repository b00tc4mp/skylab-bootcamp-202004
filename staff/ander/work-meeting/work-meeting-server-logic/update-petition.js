require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {models:{WorkGroup, Petition}} = require('work-meeting-data')
const {errors:{DuplicityError, UnexistenceError}} = require('work-meeting-commons')
module.exports=(workGroupId,userId,status) =>{ //status value is (accepted/dennied)
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    
    return (async ()=>{
        const workGroup = await WorkGroup.findOne({ _Id: ObjectId(workGroupId)})
            if(!workGroup) throw UnexistenceError(`workGroup with Id: ${workGroupId} dont exist`)
        const petitions = workGroup.petition
        const petition =  petitions.find(({user})=> user.toString()===userId)
            if(!petition) throw UnexistenceError(`petition with UserId: ${userId} exist`)
         
        petition.status = status
  
        petitions = petitions.filter(petition=> petition.status === 'pending')

        await workGroup.save()

        
        if(status==='accepted') return true
        

        if(status === 'denied') return false
        
    })
}