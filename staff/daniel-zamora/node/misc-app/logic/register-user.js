const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')

module.exports = (user , callback)=>{
   const  {name, surname, email, password} = user;
   if(name) String.validate.notVoid(name)
   if(surname) String.validate.notVoid(surname)
   if(email){
       String.validate.notVoid(email)
       Email.validate(email)
   } 
   if(password) String.validate.notVoid(password)

   fs.readdir(path.join(__dirname,"..","data","users"), (error, files)=>{
       if(error) return callback(error)
       let wasError = false
       let isDuplicated=false
       const contacts = []
       files.forEach(file=>{
           fs.readFile(path.join(__dirname,"..","data","users", file), (error, json)=>{
               if(error){
                   if(!wasError){
                       callback(error)
                       wasError=true
                   }
                   return
               }
               if (!wasError) {
                const _user = JSON.parse(json)
                   if (!isDuplicated)
                    if(_user.email===email) {
                        isDuplicated=true
                        callback("user already exist!")
                    }
               }
           })
       })
       if(isDuplicated) return callback(error)
       else {
        const id = `${Date.now()}`
        const title = `${id}.json`
        user.id = id;
        fs.writeFile(path.join(__dirname, '..', 'data', 'users', title), JSON.stringify(user,null,4),error =>{
            if(error) return callback(error) 
            callback(null, id) 
        })
       }
   })

}


