const findUser=require("../logic/find-user-by-filter");
/**
 * Checks if there is a user registered whith the specified email and password
 * @param {string} email email of the user trying to authenticate
 * @param {string} password password of the user trying to authenticate
 * @param {function} callback function called after finishing. Returns an error if has been any or the id of the user authenticated
 * @throws {TypeError} throws an error if email or password are not a string
 * @throws {TypeError}  throws an error if the callback is not a function
 */
function authenticateUser(email,password,callback) {
    //Valida los parametros
    if(typeof email!=="string") throw new TypeError(email+" is not a string");
    if(typeof password!=="string") throw new TypeError(password+" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");
    //Busca usuario guardado con ese email
    findUser({email},(error,[user])=>{
        if(error) return callback(error);
        if(!user) return callback(new Error(`user with email: ${email} doesn't exist`));
        (user.password===password)?callback(null,user.id):callback(new Error("wrong password"));
    })
}
module.exports=authenticateUser;