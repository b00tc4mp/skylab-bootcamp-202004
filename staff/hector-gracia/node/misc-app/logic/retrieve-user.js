const findUser=require("../logic/find-user-by-filter");
/**
 * Returns the info of a specefied user excluding sensible information like the id or the password  
 * @param {string} userId id of the user whose info is going to be retrieved
 * @param {function} callback function called at the end. Returns the possible errors or the user info
 * @throws {TypeError} throws an error if userId is not a string
 * @throws {TypeError} throws an error if the callback is not a function
 */
function retrieveUser(userId,callback){
    if(typeof userId!=="string") throw new TypeError(userId+" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");

    findUser({id:userId},(error,[user])=>{
        if(error) return callback(error);
        if(!user) return callback(new Error(`user with id: ${userId} doesn't exist`));
        delete user.id;
        delete user.password;
        callback(null,user);
    })
}
module.exports=retrieveUser;