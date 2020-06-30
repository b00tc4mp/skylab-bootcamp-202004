
require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {mongoose: { ObjectId }, models:{WorkGroup, Petition}} = require('work-meeting-data')
const {errors:{DuplicityError,UnexistenceError}} = require('work-meeting-commons')
module.exports=(workGroupId,userId) =>{
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    
    return (async ()=>{
        const workGroup = await WorkGroup.findOne({ _Id: ObjectId(workGroupId)})
        if(!workGroup)
            throw new UnexistenceError(`workgroup with id ${workGroupId} not exist`)
        const petitions = workGroup.petition
        for(let petition in petitions){
            if(petition.user.toString()===userId)
                throw new DuplicityError(`petition with ${userId} ID is already exist`)    //change       
        }
        workGroup.members.forEach(element => {
            if(element.toString()===userId)
            throw new DuplicityError(`user with id ${userId} already in workgroup`)
        });
        const petition= new Petition({user: userId})
        workGroup.petition.push(petition)
        await workGroup.save()
        
    })
}