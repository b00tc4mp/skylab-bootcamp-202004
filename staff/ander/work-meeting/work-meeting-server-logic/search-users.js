require('work-meeting-commons/polyfills/string')
const {mongoose:{ObjectId}, models: {WorkGroup, Department}}= require('work-meeting-data')

module.exports= (query, workGroupId) =>{
    String.validate.notVoid(query)
    return WorkGroup.findOne({_id: ObjectId(workGroupId)}).populate('members')
        .then(workGroup =>{
            const {members, departments} = workGroup
            const _members = members.filter(member=>{
                const {name, surname, email} = member
                return name.toLowerCase().includes(query) || surname.toLowerCase().includes(query) || email.toLowerCase().includes(query)
            })
            
            return (async () => {
                const _departments = departments.filter(department=>{
                const {name} = department
                 return name.toLowerCase().includes(query)
                 }) 
                 for(departName in _departments){
                     const {_name}= departName
                     const department= await Department.findOne({name: _name}).populate('members')
                    const departmentMembers = department.members
                    for(let departMember in departmentMembers){
                        let alreadyExist
                        alreadyExist=false
                        for(let member in _members){
                            if(departMember._id==member._id)
                                alreadyExist=true
                        }
                        if(!alreadyExist)
                            _members.push(departMember)
                    }
                 }
                return _members})()

                     
                 
             })
                
         }
              

       

 
