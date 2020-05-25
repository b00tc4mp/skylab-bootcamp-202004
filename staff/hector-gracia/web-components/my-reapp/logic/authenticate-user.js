//Comprueba que existe un usuario con esa contraseña
function authenticateUser(email,password,callback){
    //Comprueba que se están enviando los valores correctos
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string');
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail');
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string');
    if (!password.trim().length) throw new Error('password is empty or blank');
    if(typeof callback!=="function") throw new TypeError(callback + " is not a function");
    
    call("POST", 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
    `{ "username": "${email}", "password": "${password}"}`, 
    { 'Content-type': 'application/json' }, (error, status, body) =>{

        if(error) return callback(error);

        if(status==200){
            const{token} =JSON.parse(body);
            callback(undefined,token)
        }else{
            callback(new Error(JSON.parse(body).error))
        }
    })
}