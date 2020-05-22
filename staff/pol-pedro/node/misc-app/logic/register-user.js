const fs= require("fs")
const path=require("path")
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')
//TODO que no registre usuario si ya existe
module.exports=(user,callback)=>{

    const{name,surname,email,password}=user

    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    //const id= uid()
    const file=`${email}.json`
    fs.access(path.join(__dirname,"..","data","users",file),fs.F_OK,(error)=>{
        if(!error) throw new Error("User already registered")
        else{
            fs.writeFile(path.join(__dirname,"..","data","users",file),JSON.stringify(user),error=>{
                if(error) return callback(error)
                callback(null,email)
            })
        }
    })
    
}