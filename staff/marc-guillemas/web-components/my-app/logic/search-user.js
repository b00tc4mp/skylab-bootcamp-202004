function searchUsers(input){
    //Comprueba que se le está dando un valor correcto a la busqueda
    if (typeof input !== 'string') throw new TypeError(input + ' is not a string')
    //if (!TEXT_REGEX.test(input)) throw new Error(input + ' is not an e-mail');
    //Devuelve el usuario que tenga el input que se está buscando
    const user = users.filter(function(user){return user.email===input || user.name===input || user.surname===input})

    var tempUsers = []; //Le añades el mail, el nombre y el apellido
    for (i in user)
        tempUsers[i] = {name: user[i].name, surname: user[i].surname, email: user[i].email}


    return tempUsers
}