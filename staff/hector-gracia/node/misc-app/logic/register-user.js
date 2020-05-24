const fs= require("fs")
const path=require("path")
const Email = require('../utils/email')
const uid = require('../utils/uid')
const findUser=require("../logic/find-user-by-filter")
require=("../utils/string")
require=('../utils/json')
/**
 * Registers an user in the server by saving it as a json in the data/users directory
 * @param {object} user object with the user that is going to be registered
 * @param {function} callback function called after finishing. Returns an error if has been any or the id of the file created 
 * @throws {TypeError} trows an error if the name,surname,email or password of the user are not a string
 * @throws {TypeError} trows an error if the callback is not a function
 */
function registerUser(user,callback) {
    
    const{name,surname,email,password}=user
    if(typeof name!=="string") throw new TypeError(name+" is not a string")
    if(typeof surname!=="string") throw new TypeError(surname+" is not a string")
    if(typeof email!=="string") throw new TypeError(email+" is not a string")
    if(typeof password!=="string") throw new TypeError(password+" is not a string")
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function")

    const id= uid()
    user.id=id
    const file=`${id}.json`
    //Comprueba que no haya un usuario guardado con ese email
    findUser({email},(error,users)=>{
        if(error) return callback(error)
        if(users.length>0) return callback(new Error(`user with email: ${email} already registered`))
        //Guarda al usuario
        fs.writeFile(path.join(__dirname,"..","data","users",file),JSON.stringify(user),error=>{
            if(error) return callback(error)
            callback(null,id)
        })
    })
}
module.exports=registerUser;