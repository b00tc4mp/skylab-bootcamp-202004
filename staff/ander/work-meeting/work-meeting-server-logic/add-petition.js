/**
 * Add petition in selected work group.
 * @param {string} workGroupId Id of the work group to which we are going to make the petition
 * @param {string} userId Id of the user
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error workgroup not exist
 * @throws {TypeError} Throws an error petition already exist
 * 
 */
require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {mongoose: { ObjectId }, models:{User,WorkGroup, Petition}} = require('work-meeting-data')
const {errors:{DuplicityError,UnexistenceError}} = require('work-meeting-commons')

module.exports=(workGroupId,userId) =>{
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    
    return (async ()=>{
        const user = await User.findOne({_id: ObjectId(userId)})
        if(!user)
        throw new UnexistenceError(`user ${userId} not exist`)
        const workGroup = await WorkGroup.findOne({ _id: ObjectId(workGroupId)})
        if(!workGroup)
            throw new UnexistenceError(`workgroup with id ${workGroupId} not exist`)
        const {petitions} = workGroup
        for(let petition in petitions){
            if(petition.status=='pending'){
                if(petition.user.toString()===userId)
                throw new DuplicityError(`petition with user ${userId} is already exist`)    //change 
            }
                  
        }
        workGroup.members.forEach(element => {
            if(element.toString()===userId)
            throw new DuplicityError(`user with id ${userId} already in workgroup`)
        });
        const petition= new Petition({user: userId})
        workGroup.petitions.push(petition)
        await workGroup.save()
        
    })()
}