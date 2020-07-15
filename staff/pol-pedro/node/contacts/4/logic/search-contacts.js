//Recibe el e-mail
//Busca en data/ todos los archivos
//Devuelve el archivo que tenga archivo.email===email
const fs= require("fs");
const Email = require('../utils/email')
const path= require("path")
require('../utils/string')
require('../utils/json')
module.exports=(email, callback)=>{
    
    String.validate.notVoid(email)
    Email.validate(email)
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function")

    fs.readdir(path.join(__dirname,"..","data"),(error,allfiles)=>{
        if(error) return callback(error)
        //data//Es un array de strings con los nombres de los archivos en data
        //Abrir todos los data en busca del que tenga el email que queremos
        //Cuando lo encontremos callback(null, fileQueEstabamosBuscando)
        let wasError=false
        let wasFound=false
        allfiles.forEach((fileName,fileIndex)=>{
            fs.readFile(path.join(__dirname,"..","data",fileName),(error,data)=>{
                if(error){
                    if(!wasError){
                        callback(error)
                        wasError = true
                    }
                    return
                }
                
                if(!wasError && !wasFound){
                    const contact= JSON.parse(data)
                    if(contact.email===email){
                        wasFound=true;
                        return callback(null,contact)
                    }
                }
                if(!wasFound && fileIndex === allfiles.length-1){
                    return callback(new Error("no such contact found"), null)
                }
            })
        })
    })
}