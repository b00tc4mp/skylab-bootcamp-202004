//Devuelve un usuario del array a partir de un campo //TODO que funcione con cualquier campo
function retrieveUser(email){
    //QUE OS DEN POR CULO
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string');
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail');
    //Devuelve el usuario que tenga el email que se está buscando
    const user= users.find(function(user){return user.email===email});
    if (!user) throw new TypeError('user is undefined')
    return user;
}