const fs= require("fs")
const path=require("path")
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')
const { find } = require('../data/users')
//TODO que no registre usuario si ya existe
module.exports=(user,callback)=>{

    const{name,surname,email,password}=user

    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    const data = path.join(__dirname, '..', 'data')

    find({ email }, (error, [user]) => {
        if (error) return callback(error)

        if (user) return callback(new Error(`user with e-mail ${email} already exists`))

        const id = uid()
        
        const newUser = { id, name, surname, email, password }

        fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
            if (error) return callback(error)

            callback(null, id)
        })
    })

    //const id= uid()
    // const file=`${email}.json`
    // fs.access(path.join(__dirname,"..","data","users",file),fs.F_OK,(error)=>{
    //     if(!error) throw new Error("User already registered")
    //     else{
    //         fs.writeFile(path.join(__dirname,"..","data","users",file),JSON.stringify(user),error=>{
    //             if(error) return callback(error)
    //             callback(null,email)
    //         })
    //     }
    // })
    
}