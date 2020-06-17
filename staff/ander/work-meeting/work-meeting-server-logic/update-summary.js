require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { errors: { DuplicityError }}= require('work-meeting-commons')
const { models: { User,Summary } } = require('work-meeting-data')

module.exports = (summaryId, title, content, participants) =>{ //participants= array de Ids???
    String.validate.notVoid(summaryId)
    let updateSummary={}
    if(title!==undefined){
        String.validate.notVoid(title)
        updateSummary.title= title
    }
    if(content!==undefined){ 
        String.validate.notVoid(content)
        updateSummary.content= content
    }
    

    return (async()=>{
        
        if(participants!==undefined){
                String.validate.notVoid(participants) //faltaria comprobar que el userId es host y añadirlo a user
                const summary = await Summary.findOne({_id: ObjectId(summaryId)})
                const {oldParticipants: participants} = summary
                for(participant in participants){
                    for(oldParticipant in oldParticipants) {
                        if(oldParticipant===participant)
                            throw new DuplicityError(`Participant ${participant} alreadyExist`)
                        
                    }
                    oldParticipants.push(participants)
                }
                    
                updateSummary.participants=oldParticipants
            }

        await Summary.findByIdAndUpdate(summaryId,updateSummary)
        
    })


}