/* version sincrona antigua

//Añade un usuario al array que guarda todos
function registerUser(name,surname,email,password){
    //Comprueba que los valores dados son validos antes de hacer el registro
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string');
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' does not match the format');
    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string');
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' does not match the format');
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string');
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail');
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string');
    if (password.length < 8) throw new Error('password does not have the min length');
    
    //Comprueba si ya existe un usuario con ese correo
    const user= users.find(function(user){return user.email===email})
    if(user) throw new Error("user already exists");

    //Mete al usuario en el array
    users.push(new User(name,surname,email,password))
}
*/
////////Version asincrona actual
function registerUser(name,surname,email,password,callback){
    //Comprueba que los valores dados son validos antes de hacer el registro
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string');
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' does not match the format');
    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string');
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' does not match the format');
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string');
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail');
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string');
    if (password.length < 8) throw new Error('password does not have the min length');
    if(typeof callback!=="function") throw new TypeError(callback + " is not a function");
    //Llama a la api para que registre este nuevo usuario
    call("POST","https://skylabcoders.herokuapp.com/api/v2/users",
    `{ "username": "${email}","password": "${password}", "name": "${name}", "surname": "${surname}" }`,
    { 'Content-type': 'application/json' },
    (error,status,body)=>{
        //Comprueba error de conexion
        if(error) return callback(error);

        //Comprueba que no ha habido u error llamando a la API
        if(status===201){
            callback();
        }else{
            callback(new Error(JSON.parse(body).error))
        }
    })
}