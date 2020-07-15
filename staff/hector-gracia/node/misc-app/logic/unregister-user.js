const fs= require("fs")
const path=require("path")
const findUser=require("../logic/find-user-by-filter")
/**
 * 
 * @param {string} email email of the user that is going to be deleted from the server
 * @param {string} password password of the user that is going to be deleted from the server
 * @param {function} callback function called at the end. Returns the possible errors or an object with the message "OK" if nothing goes wrong
 */
function unregisterUser(email,password,callback){
    if(typeof email!=="string") throw new TypeError(email+" is not a string");
    if(typeof password!=="string") throw new TypeError(password+" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");

    findUser({email},(error,[user])=>{
        if(error) return callback(error);
        if(!user) return callback(new Error(`user with email: ${email} doesn't exist`));
        if(user.password!==password) return callback(new Error("wrong password"));
        fs.unlink(path.join(__dirname,"..","data","users",`${user.id}.json`),()=>{
            callback(null,{message:"OK"});
        })
    })
}
module.exports=unregisterUser;